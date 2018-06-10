module BugsBunny exposing (main)

{-
   Evolves an image of Bugs Bunny

   Warning: This uses a Native module to query the canvas for pixel values!
-}

import Array
import Color exposing (Color)
import Genetic exposing (IntermediateValue, Method(..), Options, dnaFromValue, executeInitialStep, executeStep, numGenerationsFromValue)
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
    = Init Settings
    | Value Settings (IntermediateValue Dna)


type alias Settings =
    { radius : Float
    , timesStuck : Int
    , newCircleThreshold : Float
    , bestScore : Float
    }


initialSettings : Settings
initialSettings =
    { radius = 200
    , timesStuck = 0
    , newCircleThreshold = 0.99
    , bestScore = toFloat Random.maxInt
    }


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
    , mutateDna = mutateDna initialSettings
    , isDoneEvolving = isDoneEvolving
    , method = MinimizePenalty
    }


init : ( Model, Cmd Msg )
init =
    -- Process.sleep is a workaround to wait for the bugs bunny image to load
    Init initialSettings ! [ Process.sleep 1000 |> Task.andThen (\_ -> Task.succeed InitMsg) |> Task.perform identity ]


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
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NextValue intermediateValue ->
            let
                ( iteration, settings ) =
                    case model of
                        Init settings ->
                            ( 0, settings )

                        Value settings intermediateValue ->
                            ( numGenerationsFromValue intermediateValue, settings )

                dna =
                    dnaFromValue intermediateValue

                score =
                    evaluateSolution dna

                timesStuck =
                    if score > settings.bestScore then
                        settings.timesStuck + 1
                    else
                        0

                ( radius, newCircleThreshold, updatedTimesStuck ) =
                    if timesStuck > 5 then
                        ( settings.radius - 1, settings.newCircleThreshold * 0.995, 0 )
                    else
                        ( settings.radius, settings.newCircleThreshold, timesStuck )

                bestScore =
                    if score < settings.bestScore then
                        score
                    else
                        settings.bestScore

                updatedSettings =
                    { radius = radius
                    , timesStuck = updatedTimesStuck
                    , newCircleThreshold = newCircleThreshold
                    , bestScore = bestScore
                    }

                updatedOptions =
                    { options | mutateDna = mutateDna updatedSettings }

                _ =
                    Debug.log "# circles" <| List.length dna

                _ =
                    Debug.log "new circle radius" radius

                _ =
                    Debug.log "new circle threshold" newCircleThreshold
            in
            if isDoneEvolving dna score iteration then
                Value updatedSettings intermediateValue ! []
            else
                Value updatedSettings intermediateValue ! [ Random.generate Wait <| executeStep updatedOptions intermediateValue ]

        InitMsg ->
            model ! [ Random.generate NextValue <| executeInitialStep options ]

        Wait intermediateValue ->
            -- This Process.sleep is there to allow the screen to draw and allow us to see it evolve in real time
            model ! [ Process.sleep 1 |> Task.andThen (\_ -> Task.succeed (NextValue intermediateValue)) |> Task.perform identity ]


max_iterations : Int
max_iterations =
    4000


randomDnaGenerator : Generator Dna
randomDnaGenerator =
    Random.list 5 (randomCircleGenerator 200 200)


randomCircleGenerator : Float -> Float -> Generator Circle
randomCircleGenerator minRadius maxRadius =
    Random.map5
        Circle
        randXGen
        randYGen
        (randRadiusGen minRadius maxRadius)
        randColor
        randColor


randXGen : Generator Float
randXGen =
    Random.float 0 555


randYGen : Generator Float
randYGen =
    Random.float 0 465


randRadiusGen : Float -> Float -> Generator Float
randRadiusGen minRadius maxRadius =
    Random.float minRadius maxRadius


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


mutateDna : Settings -> Dna -> Generator Dna
mutateDna settings dna =
    Random.float 0 1
        |> Random.andThen
            (\randNum ->
                if randNum >= settings.newCircleThreshold then
                    addCircleGenerator settings.radius dna
                else
                    mutateCircleGenerator dna
            )


addCircleGenerator : Float -> Dna -> Generator Dna
addCircleGenerator radius dna =
    randomCircleGenerator radius radius
        |> Random.map (\circle -> List.append dna [ circle ])


mutateCircleGenerator : Dna -> Generator Dna
mutateCircleGenerator dna =
    let
        initialIndex =
            if List.length dna > 6 then
                List.length dna // 2
            else
                0
    in
    Random.int initialIndex (List.length dna - 1)
        |> Random.andThen (mutateAtIndex dna)


mutateAtIndex : Dna -> Int -> Generator Dna
mutateAtIndex dna randIndex =
    dna
        |> List.indexedMap
            (\index circle ->
                if index == randIndex then
                    Random.int 0 4 |> Random.andThen (mutateCircleAttribute circle)
                else
                    RandomExtra.constant circle
            )
        |> sequence


mutateCircleAttribute : Circle -> Int -> Generator Circle
mutateCircleAttribute circle attrIndex =
    case attrIndex of
        0 ->
            mutateX circle

        1 ->
            mutateY circle

        2 ->
            mutateRadius circle

        3 ->
            mutateColor circle .color (\color -> { circle | color = color })

        _ ->
            mutateColor circle .borderColor (\borderColor -> { circle | borderColor = borderColor })


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
        200
        (round circle.radius)
        (\newRadius -> { circle | radius = toFloat newRadius })


mutateColor : Circle -> (Circle -> Color) -> (Color -> Circle) -> Generator Circle
mutateColor circle accessor updator =
    Random.int 0 3
        |> Random.andThen
            (\colorIndex ->
                let
                    colorRecord =
                        Color.toRgb <| accessor circle
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
                                updator <| Color.rgba newColor.red newColor.green newColor.blue newColor.alpha
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
                                updator <| Color.rgba newColor.red newColor.green newColor.blue newColor.alpha
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
                                updator <| Color.rgba newColor.red newColor.green newColor.blue newColor.alpha
                            )

                    _ ->
                        Random.float 0 1
                            |> Random.map (\newAlpha -> { colorRecord | alpha = newAlpha })
                            |> Random.map (\newColor -> updator <| Color.rgba newColor.red newColor.green newColor.blue newColor.alpha)
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
