module MealPlanner exposing (main)

import Genetic exposing (evolveSolution, Method(..))
import Random exposing (Generator, Seed)
import Task
import Json.Decode as Decode exposing (decodeValue, field, int)
import Models.MealPlannerModel exposing (..)


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
            case (decodeValue (field "currentTimeInMillis" int) json) of
                Ok seed ->
                    seed

                Err reason ->
                    Debug.crash <| "Unable to decode program arguments: " ++ reason

        startThingsMsg =
            Task.succeed Nothing
                |> Task.perform (\_ -> Begin)
    in
        { initialSeed = initialSeed } ! [ startThingsMsg ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Begin ->
            let
                _ =
                    evolveSolution
                        { randomDnaGenerator = randomMealPlannerGenerator
                        , evaluateOrganism = evaluateOrganism
                        , crossoverDnas = crossoverMealplans
                        , mutateDna = mutateMealplan
                        , isDoneEvolving = isDoneEvolving
                        , initialSeed = Random.initialSeed model.initialSeed
                        , method = MinimizePenalty
                        }
            in
                model ! []


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
isDoneEvolving mealPlan _ generations =
    let
        _ =
            Debug.log "" mealPlan

        _ =
            Debug.log "gen" generations
    in
        generations >= 100


evaluateOrganism : MealPlan -> Float
evaluateOrganism mealPlan =
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


mutateMealplan : Seed -> MealPlan -> ( MealPlan, Seed )
mutateMealplan seed mealPlan =
    let
        ( randDay, seed2 ) =
            Random.step (Random.int 1 7) seed
    in
        if randDay == 1 then
            mutateDay mealPlan.sunday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | sunday = day }, nextSeed )
                   )
        else if randDay == 2 then
            mutateDay mealPlan.monday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | monday = day }, nextSeed )
                   )
        else if randDay == 3 then
            mutateDay mealPlan.tuesday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | tuesday = day }, nextSeed )
                   )
        else if randDay == 4 then
            mutateDay mealPlan.wednesday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | wednesday = day }, nextSeed )
                   )
        else if randDay == 5 then
            mutateDay mealPlan.thursday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | thursday = day }, nextSeed )
                   )
        else if randDay == 6 then
            mutateDay mealPlan.friday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | friday = day }, nextSeed )
                   )
        else
            mutateDay mealPlan.saturday seed2
                |> (\( day, nextSeed ) ->
                        ( { mealPlan | saturday = day }, nextSeed )
                   )
