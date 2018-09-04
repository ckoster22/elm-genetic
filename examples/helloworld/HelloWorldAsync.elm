module HelloWorldAsync exposing (main)

{-
   This example uses `executeInitialStep`, `executeStep`, and `Random.generate` to try to evolve a solution and printing the progress to a web page as it executes.
-}

import Array
import Browser
import Browser.Events
import Char
import Genetic exposing (IntermediateValue, Method(..), Options, dnaFromValue, executeInitialStep, executeStep)
import Html exposing (Html, div, text)
import Html.Attributes exposing (style)
import Random exposing (Generator, Seed)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Browser.Events.onAnimationFrame (\_ -> UpdateView)
        }


type Model
    = Init
    | Value (IntermediateValue Dna) Int


type Msg
    = NextValue (IntermediateValue Dna)
    | UpdateView


options : Options Dna
options =
    { randomDnaGenerator = randomDnaGenerator
    , evaluateSolution = evaluateSolution
    , crossoverDnas = crossoverDnas
    , mutateDna = mutateDna
    , isDoneEvolving = isDoneEvolving
    , method = MinimizePenalty
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Init, Random.generate NextValue <| executeInitialStep options )


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
                        div [ style "font-family" "Courier New" ]
                            [ div [] [ text dnaString ]
                            , div [] [ text <| "Iteration: " ++ String.fromInt iteration ]
                            ]
                   )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NextValue intermediateValue ->
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

                cmd =
                    if iteration > 0 && modBy 100 iteration == 0 then
                        Cmd.none

                    else
                        Random.generate NextValue <| executeStep options intermediateValue
            in
            if isDoneEvolving dna score iteration then
                ( Value intermediateValue iteration
                , Cmd.none
                )

            else
                ( Value intermediateValue (iteration + 1)
                , cmd
                )

        UpdateView ->
            case model of
                Init ->
                    ( model, Cmd.none )

                Value intermediateValue iterations ->
                    if iterations >= max_iterations then
                        ( model, Cmd.none )

                    else
                        ( model, Random.generate NextValue <| executeStep options intermediateValue )


type alias Dna =
    List Int


targetSentence : String
targetSentence =
    "Attempting to evolve this sentence in eight thousand generations"


target_ascii : List Int
target_ascii =
    String.toList targetSentence
        |> List.map Char.toCode


crossover_split_index : Int
crossover_split_index =
    floor (toFloat (String.length targetSentence) / 2)


max_iterations : Int
max_iterations =
    8000


randomDnaGenerator : Generator Dna
randomDnaGenerator =
    Random.int 1 53
        |> Random.map asciiCodeMapper
        |> Random.list (String.length targetSentence)


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
    List.map2 (\target gene -> abs (target - gene)) target_ascii dna
        |> List.foldl (\diff score -> diff + score) 0
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
            Random.int 0 (String.length targetSentence - 1)

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
    bestDnaPoints == 0 || numGenerations >= max_iterations
