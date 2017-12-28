module HelloWorldAsync exposing (main)

{-
   This example uses `executeInitialStep`, `executeStep`, and `Random.generate` to try to evolve a solution and printing the progress to a web page as it executes.
-}

import Array
import Char
import Genetic exposing (IntermediateValue, Method(..), Options, dnaFromValue, executeInitialStep, executeStep)
import Html exposing (Html, div, text)
import Random exposing (Generator, Seed)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type Model
    = Init
    | Value (IntermediateValue Dna) Int


type Msg
    = NextValue (IntermediateValue Dna)


options : Options Dna
options =
    { randomDnaGenerator = randomDnaGenerator
    , evaluateSolution = evaluateSolution
    , crossoverDnas = crossoverDnas
    , mutateDna = mutateDna
    , isDoneEvolving = isDoneEvolving
    , method = MinimizePenalty
    }


init : ( Model, Cmd Msg )
init =
    Init ! [ Random.generate NextValue <| executeInitialStep options ]


view : Model -> Html Msg
view model =
    case model of
        Init ->
            text "Algo not started yet"

        Value intermediateValue iteration ->
            intermediateValue
                |> dnaFromValue
                |> List.map Char.fromCode
                |> String.fromList
                |> (\dnaString ->
                        div []
                            [ div [] [ text dnaString ]
                            , div [] [ text <| "iteration: " ++ toString iteration ]
                            ]
                   )


update : Msg -> Model -> ( Model, Cmd Msg )
update (NextValue intermediateValue) model =
    let
        iteration =
            case model of
                Init ->
                    0

                Value _ iter ->
                    iter

        dna =
            dnaFromValue intermediateValue

        score =
            evaluateSolution dna
    in
    if isDoneEvolving dna score iteration then
        Value intermediateValue iteration ! []
    else
        Value intermediateValue (iteration + 1) ! [ Random.generate NextValue <| executeStep options intermediateValue ]


type alias Dna =
    List Int


target : String
target =
    "Attempting to evolve this sentence in eight thousand generations"


target_ascii : List Int
target_ascii =
    String.toList target
        |> List.map Char.toCode


crossover_split_index : Int
crossover_split_index =
    floor (toFloat (String.length target) / 2)


max_iterations : Int
max_iterations =
    8000


randomDnaGenerator : Generator Dna
randomDnaGenerator =
    Random.int 1 53
        |> Random.map asciiCodeMapper
        |> Random.list (String.length target)


asciiCodeMapper : Int -> Int
asciiCodeMapper code =
    if code < 27 then
        code + 64
    else if code /= 53 then
        code + 70
    else
        32


evaluateSolution : Dna -> Float
evaluateSolution dna =
    target_ascii
        |> Array.fromList
        |> Array.foldl
            (\asciiCode ( points, index ) ->
                let
                    organismAscii_ =
                        dna
                            |> Array.fromList
                            |> Array.get index
                in
                case organismAscii_ of
                    Just organismAscii ->
                        ( points + abs (organismAscii - asciiCode), index + 1 )

                    Nothing ->
                        Debug.crash "Organism dna is too short!"
            )
            ( 0, 0 )
        |> Tuple.first
        |> toFloat


crossoverDnas : Dna -> Dna -> Dna
crossoverDnas dna1 dna2 =
    let
        ( dnaPart1, dnaPart2 ) =
            ( List.take crossover_split_index dna1, List.drop crossover_split_index dna2 )
    in
    List.append dnaPart1 dnaPart2


mutateDna : Dna -> Generator Dna
mutateDna dna =
    let
        randIndexGenerator =
            Random.int 0 (String.length target - 1)

        randAsciiCodeGenerator =
            Random.int 1 53
                |> Random.map asciiCodeMapper
    in
    Random.map2
        (\randomIndex randomAsciiCode ->
            dna
                |> List.indexedMap
                    (\index asciiCode ->
                        if index == randomIndex then
                            randomAsciiCode
                        else
                            asciiCode
                    )
        )
        randIndexGenerator
        randAsciiCodeGenerator


isDoneEvolving : Dna -> Float -> Int -> Bool
isDoneEvolving bestDna bestDnaPoints numGenerations =
    let
        _ =
            Debug.log "" (List.map Char.fromCode bestDna |> String.fromList)
    in
    bestDnaPoints == 0 || numGenerations >= max_iterations
