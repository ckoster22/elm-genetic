module Genetic exposing (evolveSolution, Organism, Dna)

import List.Nonempty as NonemptyList exposing (Nonempty)
import Random exposing (Generator, Seed)


population_size : Int
population_size =
    20


half_population_size : Int
half_population_size =
    round <| toFloat population_size / 2


type alias Dna =
    List Int


type alias Organism =
    { dna : Dna
    , score : Float
    }


type alias Population =
    Nonempty Organism


type alias Options =
    { randomOrganismGenerator : Generator Organism
    , scoreOrganism : Dna -> Float
    , crossoverDnas : Dna -> Dna -> Seed -> ( Dna, Seed )
    , mutateDna : ( Dna, Seed ) -> ( Dna, Seed )
    , isDoneEvolving : Organism -> Int -> Bool
    , initialSeed : Seed
    }


evolveSolution : Options -> ( Population, Organism, Seed )
evolveSolution options =
    let
        ( initialPopulation_, seed2 ) =
            generateInitialPopulation options.randomOrganismGenerator options.initialSeed
    in
        case initialPopulation_ of
            Just initialPopulation ->
                let
                    ( nextPopulation, bestOrganism, seed3 ) =
                        executeStep options initialPopulation seed2
                in
                    recursivelyEvolve 0 options initialPopulation bestOrganism seed3

            Nothing ->
                Debug.crash "Unable to produce random non-empty list"


recursivelyEvolve : Int -> Options -> Population -> Organism -> Seed -> ( Population, Organism, Seed )
recursivelyEvolve numGenerations options population bestOrganism seed =
    if (options.isDoneEvolving bestOrganism numGenerations) then
        ( population, bestOrganism, seed )
    else
        let
            ( nextPopulation, nextBestOrganism, nextSeed ) =
                executeStep options population seed
        in
            recursivelyEvolve (numGenerations + 1) options nextPopulation nextBestOrganism nextSeed


executeStep : Options -> Population -> Seed -> ( Population, Organism, Seed )
executeStep options population seed =
    let
        bestSolution =
            population
                |> NonemptyList.sortBy .score
                |> NonemptyList.head

        ( nextPopulation, nextSeed ) =
            generateNextGeneration options population seed
    in
        ( nextPopulation, bestSolution, nextSeed )


generateInitialPopulation : Generator Organism -> Seed -> ( Maybe (Nonempty Organism), Seed )
generateInitialPopulation orgGenerator seed =
    let
        ( randomOrganisms, nextSeed ) =
            Random.step (Random.list population_size orgGenerator) seed
    in
        ( NonemptyList.fromList randomOrganisms, nextSeed )


generateNextGeneration : Options -> Population -> Seed -> ( Population, Seed )
generateNextGeneration options currPopulation seed =
    let
        bestHalfOfPopulation =
            currPopulation
                |> NonemptyList.sortBy .score
                |> NonemptyList.toList
                |> List.take half_population_size

        ( nextGeneration, nextSeed ) =
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
                |> (\( families, _, nextSeed ) ->
                        ( families, nextSeed )
                   )
    in
        ( nextGeneration |> NonemptyList.fromList |> Maybe.withDefault currPopulation, nextSeed )


produceFamily : Options -> Organism -> Organism -> Seed -> ( List Organism, Seed )
produceFamily options parent1 parent2 seed =
    let
        ( child1, seed2 ) =
            produceChild options parent1 parent2 seed

        ( child2, seed3 ) =
            produceChild options parent1 parent2 seed2

        ( child3, seed4 ) =
            produceChild options parent1 parent2 seed3

        bestParent =
            if parent1.score < parent2.score then
                parent1
            else
                parent2
    in
        ( [ child1, child2, child3, bestParent ], seed4 )


produceChild : Options -> Organism -> Organism -> Seed -> ( Organism, Seed )
produceChild options parent1 parent2 seed =
    let
        ( childDna, nextSeed ) =
            options.crossoverDnas parent1.dna parent2.dna seed
                |> options.mutateDna
    in
        ( Organism childDna (options.scoreOrganism childDna), nextSeed )
