module Genetic exposing (evolveSolution, Method(..))

{-| An implementation of a genetic algorithm. A single function `evolveSolution` is exposed and when
invoked with the appropriate callbacks it will attempt to find an optimal solution.

@docs Method, evolveSolution

-}

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

Your `evaluateOrganism` function is used to assign a value to an entire generation of possible solutions. `Method` tells the algorithm whether to keep and "breed" the solutions with a higher value or a lower value.

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


type alias Options dna =
    { randomDnaGenerator : Generator dna
    , evaluateOrganism : dna -> Float
    , crossoverDnas : dna -> dna -> Generator dna
    , mutateDna : dna -> Generator dna
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , method : Method
    }


{-| Kicks off the genetic algorithm.

There are a handful of callbacks required because the algorithm needs the following information:

  - How to generate a random solution
  - Given a potential solution, how should it be evaluated?
  - How to breed two solutions
  - Is the current best solution good enough?
  - An initial random seed
  - Are we maximizing a score or minimizing a penalty?

These details are captured in the following record:

    type alias Options dna =
        { randomDnaGenerator : Generator dna
        , evaluateOrganism : dna -> Float
        , crossoverDnas : dna -> dna -> Generator dna
        , mutateDna : dna -> Generator dna
        , isDoneEvolving : dna -> Float -> Int -> Bool
        , method : Method
        }

The [Hello world](https://github.com/ckoster22/elm-genetic/tree/master/examples/helloworld) example is a good starting point for better understanding these functions.

When the algorithm is finished it'll return the best solution (dna) it could find, the value associated with that solution from `evaluateOrganism`, and the next random `Seed` to be used in subsequent `Random` calls.

-}
evolveSolution : Options dna -> Generator ( Population dna, dna, Float )
evolveSolution options =
    generateInitialPopulation options
        |> Random.andThen (evolveOnce options)
        |> Random.andThen (uncurry <| recursivelyEvolve 0 options)
        |> Random.map
            (\( finalGen, bestOrganism ) ->
                ( finalGen, bestOrganism.dna, bestOrganism.points )
            )


recursivelyEvolve :
    Int
    -> Options dna
    -> Population dna
    -> Organism dna
    -> Generator ( Population dna, Organism dna )
recursivelyEvolve numGenerations options population bestOrganism =
    if (options.isDoneEvolving bestOrganism.dna bestOrganism.points numGenerations) then
        constantGen ( population, bestOrganism )
    else
        evolveOnce options population
            |> Random.andThen
                (uncurry <| recursivelyEvolve (numGenerations + 1) options)


evolveOnce :
    Options dna
    -> Population dna
    -> Generator ( Population dna, Organism dna )
evolveOnce options population =
    let
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
        generateNextGeneration options population
            |> Random.map
                (\nextPopulation ->
                    ( nextPopulation, bestSolution )
                )


generateInitialPopulation : Options dna -> Generator (Nonempty (Organism dna))
generateInitialPopulation options =
    options.randomDnaGenerator
        |> Random.map
            (\asciiCodes ->
                Organism asciiCodes <| options.evaluateOrganism asciiCodes
            )
        |> NonemptyHelper.randomNonemptyList population_size


generateNextGeneration : Options dna -> Population dna -> Generator (Population dna)
generateNextGeneration options currPopulation =
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
        reproduceBestOrganisms options bestHalfOfPopulation
            |> Random.map
                (\nextGeneration ->
                    nextGeneration |> NonemptyList.fromList |> Maybe.withDefault currPopulation
                )


constantGen : a -> Generator a
constantGen val =
    Random.bool |> Random.map (always val)


reproduceBestOrganisms :
    Options dna
    -> List (Organism dna)
    -> Generator (List (Organism dna))
reproduceBestOrganisms options bestHalfOfPopulation =
    case bestHalfOfPopulation of
        [] ->
            constantGen []

        [ organism ] ->
            constantGen [ organism ]

        prev :: curr :: rest ->
            produceFamily options prev curr
                |> Random.andThen
                    (\family ->
                        reproduceBestOrganisms options (curr :: rest)
                            |> Random.map (\organisms -> List.append organisms family)
                    )


produceFamily : Options dna -> Organism dna -> Organism dna -> Generator (List (Organism dna))
produceFamily options parent1 parent2 =
    let
        bestParent : Organism dna
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
        Random.list 3 (produceChild options parent1 parent2)
            |> Random.map (\children -> children ++ [ bestParent ])


produceChild : Options dna -> Organism dna -> Organism dna -> Generator (Organism dna)
produceChild options parent1 parent2 =
    options.crossoverDnas parent1.dna parent2.dna
        |> Random.andThen options.mutateDna
        |> Random.map
            (\childDna ->
                Organism childDna (options.evaluateOrganism childDna)
            )
