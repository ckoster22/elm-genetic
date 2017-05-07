module Genetic exposing (evolveSolution, Organism, Dna)

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


type alias Options =
    { randomOrganismGenerator : Generator Organism
    , scoreOrganism : Dna -> Float
    , crossoverDnas : Dna -> Dna -> Seed -> ( Dna, Seed )
    , mutateDna : ( Dna, Seed ) -> ( Dna, Seed )
    , isDoneEvolving : Maybe Organism -> Int -> Bool
    , initialSeed : Seed
    }


type alias StepValue =
    { nextPopulation : List Organism
    , currentBestSolution : Maybe Organism
    }


evolveSolution : Options -> ( List Organism, Maybe Organism, Seed )
evolveSolution options =
    let
        ( initialPopulation, nextSeed ) =
            generateInitialPopulation options.randomOrganismGenerator options.initialSeed

        stepValue =
            { nextPopulation = initialPopulation
            , currentBestSolution = Nothing
            }
    in
        recursivelyEvolve 0 options initialPopulation Nothing nextSeed


recursivelyEvolve : Int -> Options -> List Organism -> Maybe Organism -> Seed -> ( List Organism, Maybe Organism, Seed )
recursivelyEvolve numGenerations options population bestOrganism_ seed =
    if (options.isDoneEvolving bestOrganism_ numGenerations) then
        ( population, bestOrganism_, seed )
    else
        let
            ( nextPopulation, nextBestOrganism_, nextSeed ) =
                executeStep options population seed
        in
            recursivelyEvolve (numGenerations + 1) options nextPopulation nextBestOrganism_ nextSeed


executeStep : Options -> List Organism -> Seed -> ( List Organism, Maybe Organism, Seed )
executeStep options population seed =
    let
        bestSolution_ =
            population
                |> List.sortBy .score
                |> List.head

        ( nextPopulation, nextSeed ) =
            generateNextGeneration options population seed
    in
        ( nextPopulation, bestSolution_, nextSeed )


generateInitialPopulation : Generator Organism -> Seed -> ( List Organism, Seed )
generateInitialPopulation orgGenerator seed =
    Random.step (Random.list population_size orgGenerator) seed


generateNextGeneration : Options -> List Organism -> Seed -> ( List Organism, Seed )
generateNextGeneration options currPopulation seed =
    let
        bestHalfOfPopulation =
            currPopulation
                |> List.sortBy .score
                |> List.take half_population_size
    in
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
