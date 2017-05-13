module MealPlanner exposing (main)

import Genetic exposing (executeStep, generateInitialPopulation, Method(..))
import Genetic.StepValue as StepValue exposing (StepValue)
import Random exposing (Generator, Seed)
import Task
import Models.MealPlannerModel exposing (..)
import Models.Meal exposing (..)
import Html exposing (Html, div, button, span, text)
import Html.Attributes exposing (style)
import Time exposing (Time)
import List.Nonempty as NonemptyList exposing (Nonempty)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = (\model -> view model.bestMealPlan)
        }


type alias Model =
    { seed : Seed
    , bestMealPlan : MealPlan
    , currIteration : Int
    , stepValue_ :
        Maybe (StepValue { dna : MealPlan, points : Float } MealPlan)
        -- TODO: this is bad, fix it
    }


max_iterations : Int
max_iterations =
    50


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.currIteration < max_iterations then
        case model.stepValue_ of
            Just stepValue ->
                Time.every (100 * Time.millisecond) <| RunStep stepValue

            Nothing ->
                Sub.none
    else
        Sub.none


type Msg
    = RunFirstStep
    | RunStep (StepValue { dna : MealPlan, points : Float } MealPlan) Time


init : ( Model, Cmd Msg )
init =
    let
        startThingsMsg =
            Task.succeed Nothing
                |> Task.perform (always RunFirstStep)

        blankMealPlan =
            MealPlan NoMeals NoMeals NoMeals NoMeals NoMeals NoMeals NoMeals
    in
        (Model (Random.initialSeed 12345) blankMealPlan 0 Nothing) ! [ startThingsMsg ]


options :
    Seed
    -> { randomDnaGenerator : Generator MealPlan
       , evaluateSolution : MealPlan -> Float
       , crossoverDnas : MealPlan -> MealPlan -> MealPlan
       , mutateDna : MealPlan -> Generator MealPlan
       , isDoneEvolving : MealPlan -> Float -> Int -> Bool
       , initialSeed : Seed
       , method : Method
       }
options seed =
    { randomDnaGenerator = randomMealPlannerGenerator
    , evaluateSolution = evaluateMealPlan
    , crossoverDnas = crossoverMealplans
    , mutateDna = mutateMealplan
    , isDoneEvolving = isDoneEvolving
    , initialSeed = seed
    , method = MinimizePenalty
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RunFirstStep ->
            let
                ( initialStepValue, nextSeed ) =
                    generateInitialPopulation (options model.seed)

                ( nextStepValue, nextSeed2 ) =
                    executeStep (options model.seed) initialStepValue
                        |> (\gen ->
                                Random.step gen nextSeed
                           )
            in
                { model
                    | currIteration = model.currIteration + 1
                    , stepValue_ = Just nextStepValue
                    , bestMealPlan = StepValue.solution nextStepValue
                    , seed = nextSeed2
                }
                    ! []

        RunStep stepValue _ ->
            let
                ( nextStepValue, nextSeed2 ) =
                    executeStep (options model.seed) stepValue
                        |> (\gen ->
                                Random.step gen model.seed
                           )

                -- _ =
                --     Debug.log "penalty" <| StepValue.points nextStepValue
                -- _ =
                --     Debug.log "before" <| .monday <| .dna <| NonemptyList.head <| StepValue.solutions stepValue
                -- _ =
                --     Debug.log "after" <| .monday <| .dna <| NonemptyList.head <| StepValue.solutions nextStepValue
            in
                { model
                    | currIteration = model.currIteration + 1
                    , stepValue_ = Just nextStepValue
                    , bestMealPlan = StepValue.solution nextStepValue
                    , seed = nextSeed2
                }
                    ! []


crossoverMealplans : MealPlan -> MealPlan -> MealPlan
crossoverMealplans mealplan1 mealplan2 =
    let
        crossedMealplan =
            { sunday = mealplan1.sunday
            , monday = mealplan1.monday
            , tuesday = mealplan1.tuesday
            , wednesday = mealplan2.wednesday
            , thursday = mealplan2.thursday
            , friday = mealplan2.friday
            , saturday = mealplan2.saturday
            }
    in
        crossedMealplan


isDoneEvolving : MealPlan -> Float -> Int -> Bool
isDoneEvolving mealPlan penalty generations =
    let
        _ =
            Debug.log "gen" generations
    in
        generations >= 100


evaluateMealPlan : MealPlan -> Float
evaluateMealPlan mealPlan =
    let
        totalPenalty =
            0
                + getPenaltyForDay mealPlan.sunday
                + getPenaltyForDay mealPlan.monday
                + getPenaltyForDay mealPlan.tuesday
                + getPenaltyForDay mealPlan.wednesday
                + getPenaltyForDay mealPlan.thursday
                + getPenaltyForDay mealPlan.friday
                + getPenaltyForDay mealPlan.saturday
    in
        max 0 (100 - totalPenalty)


mutateMealplan : MealPlan -> Generator MealPlan
mutateMealplan mealPlan =
    Random.int 1 7
        |> Random.andThen
            (\randDay ->
                if randDay == 1 then
                    mutateDay mealPlan.sunday
                        |> Random.map
                            (\day ->
                                { mealPlan | sunday = day }
                            )
                else if randDay == 2 then
                    mutateDay mealPlan.monday
                        |> Random.map
                            (\day ->
                                { mealPlan | monday = day }
                            )
                else if randDay == 3 then
                    mutateDay mealPlan.tuesday
                        |> Random.map
                            (\day ->
                                { mealPlan | tuesday = day }
                            )
                else if randDay == 4 then
                    mutateDay mealPlan.wednesday
                        |> Random.map
                            (\day ->
                                { mealPlan | wednesday = day }
                            )
                else if randDay == 5 then
                    mutateDay mealPlan.thursday
                        |> Random.map
                            (\day ->
                                { mealPlan | thursday = day }
                            )
                else if randDay == 6 then
                    mutateDay mealPlan.friday
                        |> Random.map
                            (\day ->
                                { mealPlan | friday = day }
                            )
                else
                    mutateDay mealPlan.saturday
                        |> Random.map
                            (\day ->
                                { mealPlan | saturday = day }
                            )
            )


view : MealPlan -> Html Msg
view mealPlan =
    div
        [ style
            [ ( "display", "flex" )
            , ( "flex-direction", "column" )
            ]
        ]
        [ organismView mealPlan
        ]


organismView : MealPlan -> Html Msg
organismView maybeOrganism =
    div []
        [ mealPlanRow maybeOrganism
          -- , constraintsRow maybeOrganism
        ]


mealBox : Maybe Meal -> Html Msg
mealBox maybeMeal =
    let
        ( childrenHtml, bgColor, fontColor ) =
            case maybeMeal of
                Just meal ->
                    let
                        servings =
                            (toFloat meal.recipe.servings) * meal.servingMultiplier

                        -- TODO get rid of this
                        servingsColor =
                            if meal.servingMultiplier /= 1 then
                                "#0000FF"
                            else
                                "#fff9ea"

                        fColor =
                            if meal.isLeftover then
                                "#00FF00"
                            else
                                "#000000"
                    in
                        ( [ span [] [ meal.recipe.name |> Html.text ]
                          , span [] [ toString servings ++ " servings" |> Html.text ]
                          ]
                        , servingsColor
                        , fColor
                        )

                Nothing ->
                    ( [ span [] [ Html.text "No meal" ] ], "#bcbdc0", "#000000" )
    in
        div
            [ style
                [ ( "display", "flex" )
                , ( "flex-direction", "column" )
                , ( "justify-content", "center" )
                , ( "align-items", "center" )
                , ( "background-color", bgColor )
                , ( "color", fontColor )
                , ( "border", "1px solid #898886" )
                , ( "height", "120px" )
                , ( "width", "120px" )
                ]
            ]
            childrenHtml


dayBox : String -> Html Msg
dayBox dayName =
    div
        [ style
            [ ( "display", "flex" )
            , ( "justify-content", "center" )
            , ( "align-items", "center" )
            , ( "background-color", "#bb392d" )
            , ( "color", "#f3cabd" )
            , ( "border", "1px solid #898886" )
            , ( "height", "30px" )
            , ( "width", "120px" )
            ]
        ]
        [ span [] [ Html.text dayName ] ]


daysColumn : String -> Day -> Html Msg
daysColumn dayName day =
    div
        [ style
            [ ( "display", "flex" )
            , ( "flex-direction", "column" )
            ]
        ]
        [ dayBox dayName
        , mealBox <| getBreakfastMeal day
        , mealBox <| getLunchMeal day
        , mealBox <| getDinnerMeal day
        ]


labelColumn : Html Msg
labelColumn =
    div
        [ style
            [ ( "display", "flex" )
            , ( "flex-direction", "column" )
            ]
        ]
        [ dayBox ""
        , div
            [ style
                [ ( "display", "flex" )
                , ( "flex-direction", "column" )
                , ( "justify-content", "center" )
                , ( "align-items", "center" )
                , ( "background-color", "#fff9ea" )
                , ( "border", "1px solid #898886" )
                , ( "height", "120px" )
                , ( "width", "120px" )
                ]
            ]
            [ span [] [ Html.text "Breakfast" ] ]
        , div
            [ style
                [ ( "display", "flex" )
                , ( "flex-direction", "column" )
                , ( "justify-content", "center" )
                , ( "align-items", "center" )
                , ( "background-color", "#fff9ea" )
                , ( "border", "1px solid #898886" )
                , ( "height", "120px" )
                , ( "width", "120px" )
                ]
            ]
            [ span [] [ Html.text "Lunch" ] ]
        , div
            [ style
                [ ( "display", "flex" )
                , ( "flex-direction", "column" )
                , ( "justify-content", "center" )
                , ( "align-items", "center" )
                , ( "background-color", "#fff9ea" )
                , ( "border", "1px solid #898886" )
                , ( "height", "120px" )
                , ( "width", "120px" )
                ]
            ]
            [ span [] [ Html.text "Dinner" ] ]
        ]


mealPlanRow : MealPlan -> Html Msg
mealPlanRow mealPlan =
    div
        [ style
            [ ( "display", "flex" )
            , ( "justify-content", "center" )
            , ( "margin-top", "50px" )
            ]
        ]
        [ labelColumn
        , daysColumn "Sunday" mealPlan.sunday
        , daysColumn "Monday" mealPlan.monday
        , daysColumn "Tuesday" mealPlan.tuesday
        , daysColumn "Wednesday" mealPlan.wednesday
        , daysColumn "Thursday" mealPlan.thursday
        , daysColumn "Friday" mealPlan.friday
        , daysColumn "Saturday" mealPlan.saturday
        ]



-- constraintsRow : Maybe MealPlan -> Html Msg
-- constraintsRow maybeOrganism =
--     case maybeOrganism of
--         Just organism ->
--             let
--                 constraintScores =
--                     organism.constraintScores
--                 totalScore =
--                     List.foldl (\( name, score ) total -> total + score) 0 constraintScores
--                 averageScore =
--                     totalScore / (toFloat (List.length constraintScores))
--             in
--                 div
--                     [ style
--                         [ ( "display", "flex" )
--                         , ( "justify-content", "center" )
--                         ]
--                     ]
--                     ((constraintBox ( "Average", averageScore ))
--                         :: (List.map constraintBox constraintScores)
--                     )
--         Nothing ->
--             div [] []
-- constraintBox : ( String, Float ) -> Html Msg
-- constraintBox ( name, score ) =
--     let
--         heightScale =
--             2
--     in
--         div
--             [ style
--                 [ ( "display", "flex" )
--                 , ( "justify-content", "center" )
--                 , ( "margin-top", "20px" )
--                 , ( "width", "120px" )
--                 , ( "height", toString (heightScale * 100) ++ "px" )
--                 ]
--             ]
--             [ div
--                 [ style
--                     [ ( "display", "flex" )
--                     , ( "flex-direction", "column" )
--                     , ( "justify-content", "flex-end" )
--                     ]
--                 ]
--                 [ div
--                     [ style
--                         [ ( "width", "20px" )
--                         , ( "height", toString (round (heightScale * score)) ++ "px" )
--                         , ( "background-color", "blue" )
--                         ]
--                     ]
--                     []
--                 , div [] [ toString (round score) ++ "%" |> Html.text ]
--                 , div [] [ Html.text name ]
--                 ]
--             ]
