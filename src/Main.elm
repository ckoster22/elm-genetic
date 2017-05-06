module Main exposing (main)

import Html exposing (Html, text)
import Genetic exposing (evolveSolution, Options, Organism, Dna)
import Random exposing (Generator, Seed)
import Char
import Array


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = initialModel
        , view = view
        , update = update
        }


type alias Model =
    {}


type Msg
    = NoOp


initialModel : Model
initialModel =
    {}


target : String
target =
    "Genetic algorithm in Elm!"


target_ascii : List Int
target_ascii =
    String.toList target
        |> List.map Char.toCode


crossover_split_index : Int
crossover_split_index =
    floor ((toFloat (String.length target)) / 2)


max_iterations =
    3000


helloWorldOptions : Options
helloWorldOptions =
    { randomOrganismGenerator = randomOrganismGenerator
    , scoreOrganism = scoreOrganism
    , crossoverDnas = crossoverDnas
    , mutateDna = mutateDna
    , isDoneEvolving = isDoneEvolving
    , initialSeed = Random.initialSeed 0
    }


asciiCodeMapper : Int -> Int
asciiCodeMapper code =
    if code < 27 then
        code + 64
    else if code /= 53 then
        code + 70
    else
        32


randomOrganismGenerator : Generator Organism
randomOrganismGenerator =
    Random.int 1 53
        |> Random.map asciiCodeMapper
        |> Random.list (String.length target)
        |> Random.map
            (\asciiCodes ->
                Organism asciiCodes Nothing
            )


scoreOrganism : Organism -> Float
scoreOrganism organism =
    target_ascii
        |> Array.fromList
        |> Array.foldl
            (\asciiCode ( score, index ) ->
                let
                    organismAscii_ =
                        organism.dna
                            |> Array.fromList
                            |> Array.get index
                in
                    case organismAscii_ of
                        Just organismAscii ->
                            ( score + abs (organismAscii - asciiCode), index + 1 )

                        Nothing ->
                            Debug.crash "Organism dna is too short!"
            )
            ( 0, 0 )
        |> Tuple.first
        |> toFloat


crossoverDnas : Dna -> Dna -> Seed -> ( Dna, Seed )
crossoverDnas dna1 dna2 seed =
    let
        ( dna1IsFirst, nextSeed ) =
            Random.step Random.bool seed

        ( dnaPart1, dnaPart2 ) =
            if dna1IsFirst then
                ( List.take crossover_split_index dna1, List.drop crossover_split_index dna2 )
            else
                ( List.take crossover_split_index dna2, List.drop crossover_split_index dna1 )
    in
        ( List.append dnaPart1 dnaPart2, nextSeed )


mutateDna : ( Dna, Seed ) -> ( Dna, Seed )
mutateDna ( dna, seed ) =
    let
        ( randomIndex, seed2 ) =
            Random.step (Random.int 0 (String.length target)) seed

        ( randomAsciiCode, seed3 ) =
            Random.int 1 53
                |> Random.map asciiCodeMapper
                |> (\gen ->
                        Random.step gen seed2
                   )

        mutatedDna =
            dna
                |> List.indexedMap
                    (\index asciiCode ->
                        if index == randomIndex then
                            randomAsciiCode
                        else
                            asciiCode
                    )
    in
        ( mutatedDna, seed3 )


isDoneEvolving : Maybe Organism -> Int -> Bool
isDoneEvolving bestOrganism_ numGenerations =
    -- let
    --     _ =
    --         Debug.log "gen" numGenerations
    -- in
    case bestOrganism_ of
        Just bestOrganism ->
            let
                _ =
                    Debug.log "" (List.map Char.fromCode bestOrganism.dna |> String.fromList)
            in
                case bestOrganism.score of
                    Just num ->
                        num == 0 || numGenerations >= max_iterations

                    _ ->
                        False

        _ ->
            False


_ =
    evolveSolution helloWorldOptions


view : Model -> Html Msg
view model =
    text "Hello world"


update : Msg -> Model -> Model
update msg model =
    model
