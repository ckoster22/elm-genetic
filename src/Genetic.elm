module Genetic exposing (evolveSolution, Method(..))

{-| An implementation of a genetic algorithm. A single function `evolveSolution` is exposed and when
invoked with the appropriate callbacks it will attempt to find an optimal solution.

@docs evolveSolution, Method

-}

import List.Nonempty as NonemptyList exposing (Nonempty)
import Random exposing (Generator, Seed)


population_size : Int
population_size =
    20


half_population_size : Int
half_population_size =
    round <| toFloat population_size / 2


{-| x
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
    , crossoverDnas : dna -> dna -> Seed -> ( dna, Seed )
    , mutateDna : ( dna, Seed ) -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }


{-| Kicks off the algorithm
TODO: examples for callbacks
TODO: explain the return value
-}
evolveSolution :
    { randomDnaGenerator : Generator dna
    , evaluateOrganism : dna -> Float
    , crossoverDnas : dna -> dna -> Seed -> ( dna, Seed )
    , mutateDna : ( dna, Seed ) -> ( dna, Seed )
    , isDoneEvolving : dna -> Float -> Int -> Bool
    , initialSeed : Seed
    , method : Method
    }
    -> ( Population dna, dna, Float, Seed )
evolveSolution options =
    let
        ( initialPopulation_, seed2 ) =
            generateInitialPopulation options

        ( finalGeneration, bestOrganism, seed3 ) =
            case initialPopulation_ of
                Just initialPopulation ->
                    let
                        ( nextPopulation, bestOrganism, seed3 ) =
                            executeStep options initialPopulation seed2
                    in
                        recursivelyEvolve 0 options nextPopulation bestOrganism seed3

                Nothing ->
                    Debug.crash "Unable to produce random non-empty list"
    in
        ( finalGeneration, bestOrganism.dna, bestOrganism.points, seed3 )


recursivelyEvolve : Int -> Options dna -> Population dna -> Organism dna -> Seed -> ( Population dna, Organism dna, Seed )
recursivelyEvolve numGenerations options population bestOrganism seed =
    if (options.isDoneEvolving bestOrganism.dna bestOrganism.points numGenerations) then
        ( population, bestOrganism, seed )
    else
        let
            ( nextPopulation, nextBestOrganism, nextSeed ) =
                executeStep options population seed
        in
            recursivelyEvolve (numGenerations + 1) options nextPopulation nextBestOrganism nextSeed


executeStep : Options dna -> Population dna -> Seed -> ( Population dna, Organism dna, Seed )
executeStep options population seed =
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

        ( nextPopulation, nextSeed ) =
            generateNextGeneration options population seed
    in
        ( nextPopulation, bestSolution, nextSeed )


generateInitialPopulation : Options dna -> ( Maybe (Nonempty (Organism dna)), Seed )
generateInitialPopulation options =
    let
        ( randomOrganisms, nextSeed ) =
            options.randomDnaGenerator
                |> Random.map
                    (\asciiCodes ->
                        Organism asciiCodes <| options.evaluateOrganism asciiCodes
                    )
                |> Random.list population_size
                |> (\generator -> Random.step generator options.initialSeed)
    in
        ( NonemptyList.fromList randomOrganisms, nextSeed )


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
        ( childDna, nextSeed ) =
            options.crossoverDnas parent1.dna parent2.dna seed
                |> options.mutateDna
    in
        ( Organism childDna (options.evaluateOrganism childDna), nextSeed )
