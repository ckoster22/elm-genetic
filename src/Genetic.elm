module Genetic exposing (evolveSolution, Options, Organism, Dna)

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
    , score : Maybe Float
    }


type alias Options =
    { randomOrganismGenerator : Generator Organism
    , scoreOrganism : Organism -> Float
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
        scoredPopulation =
            population
                |> List.map
                    (\organism ->
                        { organism | score = Just <| options.scoreOrganism organism }
                    )

        bestSolution_ =
            scoredPopulation
                |> sortPopulationByScore
                |> List.head

        ( nextPopulation, nextSeed ) =
            generateNextGeneration options scoredPopulation seed
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
                |> sortPopulationByScore
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
            case ( parent1.score, parent2.score ) of
                ( Just score1, Just score2 ) ->
                    if score1 < score2 then
                        parent1
                    else
                        parent2

                _ ->
                    Debug.crash "Not possible. Model your data better!"
    in
        ( [ child1, child2, child3, bestParent ], seed4 )


produceChild : Options -> Organism -> Organism -> Seed -> ( Organism, Seed )
produceChild options parent1 parent2 seed =
    let
        ( childDna, nextSeed ) =
            options.crossoverDnas parent1.dna parent2.dna seed
                |> options.mutateDna
    in
        ( Organism childDna Nothing, nextSeed )


sortPopulationByScore : List Organism -> List Organism
sortPopulationByScore population =
    population
        |> List.sortWith
            (\organism1 organism2 ->
                case ( organism1.score, organism2.score ) of
                    ( Just score1, Just score2 ) ->
                        if score1 > score2 then
                            GT
                        else if score1 < score2 then
                            LT
                        else
                            EQ

                    ( Just _, Nothing ) ->
                        LT

                    ( Nothing, Just _ ) ->
                        GT

                    _ ->
                        EQ
            )
