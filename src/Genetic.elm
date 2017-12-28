module Genetic exposing (IntermediateValue, Method(..), Options, dnaFromValue, executeInitialStep, executeStep, solutionGenerator)

{-| An implementation of a genetic algorithm. A single function `solutionGenerator` is exposed which will
produce a generator that can be used to evolve a "good enough" solution.

Note - This generator has a recursive structure and will block the thread until `isDoneEvolving` returns
`True`.

@docs IntermediateValue, Method, Options, solutionGenerator, dnaFromValue, executeInitialStep, executeStep

-}

import Genetic.StepValue as StepValue exposing (PointedDna, StepValue)
import List.Nonempty as NonemptyList exposing (Nonempty)
import NonemptyHelper
import Random exposing (Generator)


population_size : Int
population_size =
    20


half_population_size : Int
half_population_size =
    population_size // 2


{-| For simple use cases the genetic algorithm will be doing one of two things:

  - Maximizing a score
  - Minimizing a penalty or cost

Your `evaluateSolution` function is used to assign a value to an entire generation of possible solutions. `Method` tells the algorithm whether to keep and "breed" the solutions with a higher value or a lower value.

-}
type Method
    = MaximizeScore
    | MinimizePenalty


type alias Organism dna =
    { dna : dna
    , points : Float
    }


type alias Population dna =
    Nonempty (Organism dna)


type Generation dna
    = Generation (Nonempty (Organism dna))


{-| There are a handful of functions required because the algorithm needs the following information:

  - How to generate a random solution
  - Given a potential solution, how should it be evaluated?
  - How to breed two solutions
  - Is the current best solution good enough?
  - Are we maximizing a score or minimizing a penalty?

These details are captured in the following record:

    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : dna -> Generator dna
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , method : Method
    }

-}
type alias Options dna =
    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : dna -> Generator dna
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , method : Method
    }


{-| An intermediate value provided between each execute step of the genetic algorithm. This type is necessary when not using `solutionGenerator`.
-}
type IntermediateValue dna
    = IntermediateValue (StepValue (PointedDna dna))


{-| TODO
-}
dnaFromValue : IntermediateValue a -> a
dnaFromValue (IntermediateValue stepValue) =
    .dna <| StepValue.solution stepValue


{-| Produces a generator that runs the entire genetic algorithm. Note: This can be very slow! Put a max iterations in your `isDoneEvolving` function!

The [Hello world](https://github.com/ckoster22/elm-genetic/tree/master/examples/helloworld) example is a good starting point for better understanding these functions.

When the algorithm is finished it'll return the best solution (dna) it could find and the value associated with that solution from `evaluateSolution`.

-}
solutionGenerator : Options dna -> Generator ( dna, Float )
solutionGenerator options =
    executeInitialStep options
        |> recursivelyEvolve 0 options
        |> Random.map
            (\(IntermediateValue stepValue) ->
                ( .dna <| StepValue.solution stepValue, StepValue.points stepValue )
            )


recursivelyEvolve : Int -> Options dna -> Generator (IntermediateValue dna) -> Generator (IntermediateValue dna)
recursivelyEvolve numGenerations options stepValueGenerator =
    stepValueGenerator
        |> Random.andThen
            (\(IntermediateValue stepValue) ->
                let
                    bestOrganism =
                        StepValue.solution stepValue

                    population =
                        StepValue.solutions stepValue
                in
                if options.isDoneEvolving bestOrganism.dna bestOrganism.points numGenerations then
                    stepValueGenerator
                else
                    executeStep options (IntermediateValue <| StepValue.new population bestOrganism)
                        |> recursivelyEvolve (numGenerations + 1) options
            )


{-| Executes the first iteration of the genetic algorithm. See `Options` for more information.
-}
executeInitialStep : Options dna -> Generator (IntermediateValue dna)
executeInitialStep { randomDnaGenerator, method } =
    Random.list population_size randomDnaGenerator
        |> Random.map
            (\randDnaList ->
                randDnaList
                    |> List.map (\item -> { dna = item, points = initialPoints method })
                    |> toStepValue
            )


{-| Executes subsequent iterations of the genetic algorithm. See `Options` for more information.
-}
executeStep : Options dna -> IntermediateValue dna -> Generator (IntermediateValue dna)
executeStep options (IntermediateValue stepValue) =
    let
        population =
            StepValue.solutions stepValue

        sortedPopulation =
            NonemptyList.sortBy .points population

        bestSolution =
            case options.method of
                MaximizeScore ->
                    sortedPopulation
                        |> NonemptyList.reverse
                        |> NonemptyList.head

                MinimizePenalty ->
                    NonemptyList.head sortedPopulation
    in
    nextGenerationGenerator options population
        |> Random.map
            (\nextPopulation ->
                IntermediateValue <| StepValue.new nextPopulation bestSolution
            )


initialPoints : Method -> Float
initialPoints method =
    case method of
        MinimizePenalty ->
            toFloat Random.maxInt

        MaximizeScore ->
            toFloat Random.minInt


toStepValue : List (PointedDna dna) -> IntermediateValue dna
toStepValue pointedDna =
    case pointedDna of
        head :: rest ->
            IntermediateValue <|
                StepValue.new
                    (NonemptyHelper.fromHeadRest head rest)
                    head

        _ ->
            Debug.crash "Empty DNA list. This shouldn't be possible!"


nextGenerationGenerator : Options dna -> Population dna -> Generator (Population dna)
nextGenerationGenerator options currPopulation =
    let
        sortedPopulation =
            currPopulation
                |> NonemptyList.sortBy .points
                |> NonemptyList.toList

        bestHalfOfPopulation =
            case options.method of
                MaximizeScore ->
                    List.drop half_population_size sortedPopulation

                MinimizePenalty ->
                    List.take half_population_size sortedPopulation
    in
    bestOrganismsGenerator options bestHalfOfPopulation
        |> Random.map
            (\organismList ->
                organismList |> NonemptyList.fromList |> Maybe.withDefault currPopulation
            )


constantGen : a -> Generator a
constantGen val =
    Random.bool |> Random.map (always val)


bestOrganismsGenerator : Options dna -> List (Organism dna) -> Generator (List (Organism dna))
bestOrganismsGenerator options bestHalfOfPopulation =
    case bestHalfOfPopulation of
        [] ->
            constantGen []

        [ organism ] ->
            constantGen [ organism ]

        prev :: curr :: rest ->
            familyGenerator options prev curr
                |> Random.andThen
                    (\family ->
                        bestOrganismsGenerator options rest
                            |> Random.map (\organisms -> List.append organisms family)
                    )


familyGenerator : Options dna -> Organism dna -> Organism dna -> Generator (List (Organism dna))
familyGenerator options parent1 parent2 =
    let
        bestParent =
            case options.method of
                MaximizeScore ->
                    if parent1.points > parent2.points then
                        parent1
                    else
                        parent2

                MinimizePenalty ->
                    if parent1.points < parent2.points then
                        parent1
                    else
                        parent2
    in
    Random.map3
        (\child1 child2 child3 ->
            [ child1, child2, child3, bestParent ]
        )
        (childGenerator options parent1 parent2)
        (childGenerator options parent1 parent2)
        (childGenerator options parent1 parent2)


childGenerator : Options dna -> Organism dna -> Organism dna -> Generator (Organism dna)
childGenerator options parent1 parent2 =
    Random.map
        (\dna1IsFirst ->
            if dna1IsFirst then
                options.crossoverDnas parent1.dna parent2.dna
            else
                options.crossoverDnas parent2.dna parent1.dna
        )
        Random.bool
        |> Random.andThen options.mutateDna
        |> Random.map
            (\childDna ->
                Organism childDna (options.evaluateSolution childDna)
            )
