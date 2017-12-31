module BugsBunny exposing (main)

{-
   Evolves an image of Bugs Bunny

   Warning: This uses a Native module to query the canvas for pixel values!
-}

import Array
import Color exposing (Color)
import Genetic exposing (IntermediateValue, Method(..), Options, dnaFromValue, executeInitialStep, executeStep)
import Html exposing (Html, div, img, text)
import Html.Attributes exposing (height, id, src, width)
import Native.NativeModule
import Process
import Random exposing (Generator, Seed)
import Random.Extra as RandomExtra
import Task


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
    = InitMsg
    | NextValue (IntermediateValue Dna)
    | Wait (IntermediateValue Dna)


type alias Dna =
    List Circle


type alias Circle =
    { x : Float
    , y : Float
    , radius : Float
    , color : Color
    , borderColor : Color
    }


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
    -- Process.sleep is a workaround to wait for the bugs bunny image to load
    Init ! [ Process.sleep 1000 |> Task.andThen (\_ -> Task.succeed InitMsg) |> Task.perform identity ]


view : Model -> Html Msg
view model =
    div
        []
        [ img
            [ src "http://localhost:8000/bugsbunny.gif"
            , width 555
            , height 465
            , id "rabbit"
            ]
            []
        , iterationView model
        ]


iterationView : Model -> Html Msg
iterationView model =
    case model of
        Init ->
            text "0"

        Value _ iter ->
            text <| toString iter


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

                _ =
                    Debug.log "# circles" <| List.length dna

                score =
                    evaluateSolution dna
            in
            if isDoneEvolving dna score iteration then
                Value intermediateValue iteration ! []
            else
                Value intermediateValue (iteration + 1) ! [ Random.generate Wait <| executeStep options intermediateValue ]

        InitMsg ->
            model ! [ Random.generate NextValue <| executeInitialStep options ]

        Wait intermediateValue ->
            -- This Process.sleep is there to allow the screen to draw and allow us to see it evolve in real time
            model ! [ Process.sleep 1 |> Task.andThen (\_ -> Task.succeed (NextValue intermediateValue)) |> Task.perform identity ]


max_iterations : Int
max_iterations =
    2000


randomDnaGenerator : Generator Dna
randomDnaGenerator =
    Random.list 5 randomCircleGenerator


randomCircleGenerator : Generator Circle
randomCircleGenerator =
    Random.map5
        Circle
        randXGen
        randYGen
        randRadiusGen
        randColor
        randColor


randXGen : Generator Float
randXGen =
    Random.float 0 555


randYGen : Generator Float
randYGen =
    Random.float 0 465


randRadiusGen : Generator Float
randRadiusGen =
    Random.float 5 150


randColor : Generator Color
randColor =
    Random.map4
        Color.rgba
        (Random.int 0 255)
        (Random.int 0 255)
        (Random.int 0 255)
        (Random.float 0 1)


evaluateSolution : Dna -> Float
evaluateSolution dna =
    Native.NativeModule.evaluate <| Array.fromList dna


crossoverDnas : Dna -> Dna -> Dna
crossoverDnas dna1 dna2 =
    let
        dna1Length =
            List.length dna1 // 2

        dna2Length =
            List.length dna2 // 2

        ( dnaPart1, dnaPart2 ) =
            ( List.take dna1Length dna1, List.drop dna2Length dna2 )
    in
    List.append dnaPart1 dnaPart2


mutateDna : Dna -> Generator Dna
mutateDna dna =
    Random.float 0 1
        |> Random.andThen
            (\randNum ->
                if randNum >= 0.97 then
                    addCircleGenerator dna
                else
                    mutateCircleGenerator dna
            )


addCircleGenerator : Dna -> Generator Dna
addCircleGenerator dna =
    randomCircleGenerator
        |> Random.map (\circle -> List.append dna [ circle ])


mutateCircleGenerator : Dna -> Generator Dna
mutateCircleGenerator dna =
    Random.int 0 (List.length dna - 1)
        |> Random.andThen (mutateAtIndex dna)


mutateAtIndex : Dna -> Int -> Generator Dna
mutateAtIndex dna randIndex =
    dna
        |> List.indexedMap
            (\index circle ->
                if index == randIndex then
                    Random.int 0 3
                        |> Random.andThen (mutateCircleAttribute circle)
                    -- |> Random.map
                    --     (\c ->
                    --         let
                    --             _ =
                    --                 Debug.log "old" circle
                    --             _ =
                    --                 Debug.log "new" c
                    --         in
                    --         c
                    --     )
                else
                    RandomExtra.constant circle
            )
        |> sequence


mutateCircleAttribute : Circle -> Int -> Generator Circle
mutateCircleAttribute circle attrIndex =
    case attrIndex of
        0 ->
            -- let
            --     _ =
            --         Debug.log "mutating x" ""
            -- in
            mutateX circle

        1 ->
            -- let
            --     _ =
            --         Debug.log "mutating y" ""
            -- in
            mutateY circle

        2 ->
            -- let
            --     _ =
            --         Debug.log "mutating radius" ""
            -- in
            mutateRadius circle

        _ ->
            -- let
            --     _ =
            --         Debug.log "mutating color" ""
            -- in
            mutateColor circle


mutateValue : Circle -> Int -> Int -> (Int -> Circle) -> Generator Circle
mutateValue circle max current mutator =
    randomIntRange max current
        |> Random.map mutator


mutateX : Circle -> Generator Circle
mutateX circle =
    mutateValue
        circle
        555
        (round circle.x)
        (\newX -> { circle | x = toFloat newX })


mutateY : Circle -> Generator Circle
mutateY circle =
    mutateValue
        circle
        465
        (round circle.y)
        (\newY -> { circle | y = toFloat newY })


mutateRadius : Circle -> Generator Circle
mutateRadius circle =
    mutateValue
        circle
        50
        (round circle.radius)
        (\newRadius -> { circle | radius = toFloat newRadius })


mutateColor : Circle -> Generator Circle
mutateColor circle =
    Random.int 0 3
        |> Random.andThen
            (\colorIndex ->
                let
                    colorRecord =
                        Color.toRgb circle.color
                in
                case colorIndex of
                    0 ->
                        mutateValue
                            circle
                            255
                            colorRecord.red
                            (\newRed ->
                                let
                                    newColor =
                                        { colorRecord | red = newRed }
                                in
                                { circle | color = Color.rgba newColor.red newColor.green newColor.blue newColor.alpha }
                            )

                    1 ->
                        mutateValue
                            circle
                            255
                            colorRecord.green
                            (\newGreen ->
                                let
                                    newColor =
                                        { colorRecord | green = newGreen }
                                in
                                { circle | color = Color.rgba newColor.red newColor.green newColor.blue newColor.alpha }
                            )

                    2 ->
                        mutateValue
                            circle
                            255
                            colorRecord.blue
                            (\newBlue ->
                                let
                                    newColor =
                                        { colorRecord | blue = newBlue }
                                in
                                { circle | color = Color.rgba newColor.red newColor.green newColor.blue newColor.alpha }
                            )

                    _ ->
                        Random.float 0 1
                            |> Random.map (\newAlpha -> { colorRecord | alpha = newAlpha })
                            |> Random.map (\newColor -> { circle | color = Color.rgba newColor.red newColor.green newColor.blue newColor.alpha })
            )


randomIntRange : Int -> Int -> Generator Int
randomIntRange maxValue current =
    Random.map2
        (\delta shouldAdd ->
            if shouldAdd then
                min 555 (current + delta)
            else
                max 0 (current - delta)
        )
        (Random.int 0 (round <| 0.03 * 555))
        Random.bool


sequence : List (Generator Circle) -> Generator (List Circle)
sequence =
    List.foldr (Random.map2 (::)) (RandomExtra.constant [])


isDoneEvolving : Dna -> Float -> Int -> Bool
isDoneEvolving bestDna bestDnaPoints numGenerations =
    let
        _ =
            Debug.log "best" bestDnaPoints
    in
    numGenerations >= max_iterations
