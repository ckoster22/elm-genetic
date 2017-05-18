module HelloWorld exposing (main)

import Genetic exposing (evolveSolution, Method(..))
import Random exposing (Generator, Seed)
import Char
import Array
import Task
import Json.Decode as Decode exposing (decodeValue, int)


main : Program Decode.Value Model Msg
main =
    Platform.programWithFlags
        { init = init
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }


type alias Model =
    { initialSeed : Int }


type Msg
    = Begin


init : Decode.Value -> ( Model, Cmd Msg )
init json =
    let
        initialSeed =
            case (decodeValue int json) of
                Ok seed ->
                    seed

                Err reason ->
                    Debug.crash <| "Unable to decode program arguments: " ++ reason

        startThingsMsg =
            Task.succeed Nothing
                |> Task.perform (always Begin)
    in
        { initialSeed = initialSeed } ! [ startThingsMsg ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Begin ->
            let
                ( bestSolution, penalty, _ ) =
                    evolveSolution
                        { randomDnaGenerator = randomDnaGenerator
                        , evaluateSolution = evaluateSolution
                        , crossoverDnas = crossoverDnas
                        , mutateDna = mutateDna
                        , isDoneEvolving = isDoneEvolving
                        , initialSeed = Random.initialSeed model.initialSeed
                        , method = MinimizePenalty
                        }

                _ =
                    Debug.log "Evolved" <| String.fromList <| List.map Char.fromCode bestSolution
            in
                model ! []


type alias Dna =
    List Int


target : String
target =
    "Hello world"


target_ascii : List Int
target_ascii =
    String.toList target
        |> List.map Char.toCode


crossover_split_index : Int
crossover_split_index =
    floor ((toFloat (String.length target)) / 2)


max_iterations : Int
max_iterations =
    3000


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
