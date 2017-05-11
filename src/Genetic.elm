module Genetic exposing (evolveSolution, executeStep, generateInitialPopulation, Method(..))

{-| An implementation of a genetic algorithm. A single function `evolveSolution` is exposed and when
invoked with the appropriate callbacks it will attempt to find an optimal solution.

@docs Method, evolveSolution

# Advanced usage
Sometimes you may want more control than to run everything all at once. Perhaps you want to perform some intermediate asynchronous processing such as rendering DOM or performing a side-effect. If so, the following functions are exposed for you to take the algorithm into your own hands.
@docs executeStep, generateInitialPopulation

-}

import List.Nonempty as NonemptyList exposing (Nonempty)
import NonemptyHelper
import Random exposing (Generator, Seed)


population_size : Int
population_size =
    20


half_population_size : Int
half_population_size =
    round <| toFloat population_size / 2


{-| For simple use cases the genetic algorithm will be doing one of two things:
  * Maximizing a score
  * Minimizing a penalty or cost

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


type alias Options dna =
    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : Seed -> dna -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }


{-| Kicks off the genetic algorithm.

There are a handful of callbacks required because the algorithm needs the following information:
  * How to generate a random solution
  * Given a potential solution, how should it be evaluated?
  * How to breed two solutions
  * Is the current best solution good enough?
  * An initial random seed
  * Are we maximizing a score or minimizing a penalty?

These details are captured in the following record:

``` elm
{ randomDnaGenerator : Generator dna
, evaluateSolution : dna -> Float
, crossoverDnas : dna -> dna -> dna
, mutateDna : Seed -> dna -> ( dna, Seed )
, isDoneEvolving : dna -> Float -> Int -> Bool
, initialSeed : Seed
, method : Method
}
```

The [Hello world](https://github.com/ckoster22/elm-genetic/tree/master/examples/helloworld) example is a good starting point for better understanding these functions.

When the algorithm is finished it'll return the best solution (dna) it could find, the value associated with that solution from `evaluateSolution`, and the next random `Seed` to be used in subsequent `Random` calls.
-}
evolveSolution :
    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : Seed -> dna -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }
    -> ( Population dna, { dna : dna, points : Float }, Seed )
evolveSolution options =
    let
        ( initialGeneration, seed2 ) =
            generateInitialPopulation options

        ( finalGeneration, bestOrganism, seed3 ) =
            let
                ( nextPopulation, bestOrganism, seed3 ) =
                    executeStep options initialGeneration seed2
            in
                recursivelyEvolve 0 options nextPopulation bestOrganism seed3
    in
        ( finalGeneration, bestOrganism, seed3 )


recursivelyEvolve : Int -> Options dna -> Population dna -> Organism dna -> Seed -> ( Population dna, Organism dna, Seed )
recursivelyEvolve numGenerations options population bestOrganism seed =
    if (options.isDoneEvolving bestOrganism.dna bestOrganism.points numGenerations) then
        ( population, bestOrganism, seed )
    else
        let
            ( nextPopulation, nextBestOrganism, nextSeed ) =
                executeStep options (Generation population) seed
        in
            recursivelyEvolve (numGenerations + 1) options nextPopulation nextBestOrganism nextSeed


{-| TODO
-}
executeStep :
    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : Seed -> dna -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }
    -> Generation dna
    -> Seed
    -> ( Population dna, { dna : dna, points : Float }, Seed )
executeStep options generation seed =
    let
        population =
            getPopulationFromGeneration generation

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

        ( nextPopulation, nextSeed ) =
            generateNextGeneration options population seed
    in
        ( nextPopulation, bestSolution, nextSeed )


getPopulationFromGeneration : Generation dna -> Population dna
getPopulationFromGeneration generation =
    case generation of
        Generation dna ->
            dna


{-| TODO
-}
generateInitialPopulation :
    { randomDnaGenerator : Generator dna
    , evaluateSolution : dna -> Float
    , crossoverDnas : dna -> dna -> dna
    , mutateDna : Seed -> dna -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }
    -> ( Generation dna, Seed )
generateInitialPopulation options =
    options.randomDnaGenerator
        |> Random.map
            (\asciiCodes ->
                Organism asciiCodes <| options.evaluateSolution asciiCodes
            )
        |> NonemptyHelper.randomNonemptyList population_size options.initialSeed
        |> (\( population, seed ) ->
                ( Generation population, seed )
           )


generateNextGeneration : Options dna -> Population dna -> Seed -> ( Population dna, Seed )
generateNextGeneration options currPopulation seed =
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

        ( nextGeneration, nextSeed ) =
            reproduceBestOrganisms options bestHalfOfPopulation seed
    in
        ( nextGeneration |> NonemptyList.fromList |> Maybe.withDefault currPopulation, nextSeed )


reproduceBestOrganisms : Options dna -> List (Organism dna) -> Seed -> ( List (Organism dna), Seed )
reproduceBestOrganisms options bestHalfOfPopulation seed =
    let
        ( nextGeneration, _, nextSeed3 ) =
            bestHalfOfPopulation
                |> List.foldl
                    (\currOrganism ( organisms, prevOrganism_, nextSeed ) ->
                        case prevOrganism_ of
                            Just prevOrganism ->
                                let
                                    ( family, nextSeed2 ) =
                                        produceFamily options prevOrganism currOrganism nextSeed
                                in
                                    ( List.append organisms family, Nothing, nextSeed2 )

                            Nothing ->
                                ( organisms, Just currOrganism, nextSeed )
                    )
                    ( [], Nothing, seed )
    in
        ( nextGeneration, nextSeed3 )


produceFamily : Options dna -> Organism dna -> Organism dna -> Seed -> ( List (Organism dna), Seed )
produceFamily options parent1 parent2 seed =
    let
        ( child1, seed2 ) =
            produceChild options parent1 parent2 seed

        ( child2, seed3 ) =
            produceChild options parent1 parent2 seed2

        ( child3, seed4 ) =
            produceChild options parent1 parent2 seed3

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
        ( [ child1, child2, child3, bestParent ], seed4 )


produceChild : Options dna -> Organism dna -> Organism dna -> Seed -> ( Organism dna, Seed )
produceChild options parent1 parent2 seed =
    let
        ( dna1IsFirst, nextSeed ) =
            Random.step Random.bool seed

        ( dna1, dna2 ) =
            if dna1IsFirst then
                ( parent1.dna, parent2.dna )
            else
                ( parent2.dna, parent1.dna )

        ( childDna, nextSeed2 ) =
            options.crossoverDnas dna1 dna2
                |> options.mutateDna nextSeed
    in
        ( Organism childDna (options.evaluateSolution childDna), nextSeed2 )
