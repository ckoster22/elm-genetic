module MealPlanner exposing (main)

import Genetic exposing (evolveSolution, Method(..))
import Random exposing (Generator, Seed)
import Task
import Json.Decode as Decode exposing (decodeValue, field, int)
import MealPlannerModel exposing (..)
import MealPlannerData exposing (..)
import List.Nonempty as NonemptyList


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


randomMealPlannerGenerator : Generator MealPlan
randomMealPlannerGenerator =
    Random.pair randomDayGenerator randomDayGenerator
        |> Random.pair randomDayGenerator
        |> Random.map (\( d3, ( d1, d2 ) ) -> ( d1, d2, d3 ))
        |> Random.pair randomDayGenerator
        |> Random.map (\( d4, ( d1, d2, d3 ) ) -> ( d1, d2, d3, d4 ))
        |> Random.pair randomDayGenerator
        |> Random.map (\( d5, ( d1, d2, d3, d4 ) ) -> ( d1, d2, d3, d4, d5 ))
        |> Random.pair randomDayGenerator
        |> Random.map (\( d6, ( d1, d2, d3, d4, d5 ) ) -> ( d1, d2, d3, d4, d5, d6 ))
        |> Random.pair randomDayGenerator
        |> Random.map (\( d7, ( d1, d2, d3, d4, d5, d6 ) ) -> MealPlan d1 d2 d3 d4 d5 d6 d7)


randomDayGenerator : Generator Day
randomDayGenerator =
    Random.map4
        (\randInt meal1 meal2 meal3 ->
            if randInt == 1 then
                Breakfast meal1
            else if randInt == 2 then
                Lunch meal1
            else if randInt == 3 then
                Dinner meal1
            else if randInt == 4 then
                BreakfastLunch meal1 meal2
            else if randInt == 5 then
                BreakfastDinner meal1 meal2
            else if randInt == 6 then
                LunchDinner meal1 meal2
            else if randInt == 7 then
                AllMeals meal1 meal2 meal3
            else
                NoMeals
        )
        (Random.int 1 8)
        randomMealGenerator
        randomMealGenerator
        randomMealGenerator


randomMealGenerator : Generator Meal
randomMealGenerator =
    Random.map3
        Meal
        randomRecipeGenerator
        (Random.float 1 3)
        Random.bool


randomRecipeGenerator : Generator Recipe
randomRecipeGenerator =
    Random.map
        (\index ->
            NonemptyList.get index allRecipes
        )
        (Random.int 0 (NonemptyList.length allRecipes - 1))


crossoverMealplans : MealPlan -> MealPlan -> Seed -> ( MealPlan, Seed )
crossoverMealplans mealplan1 mealplan2 seed =
    let
        ( isMealplan1First, nextSeed ) =
            Random.step Random.bool seed

        crossedMealplan =
            if isMealplan1First then
                { sunday = mealplan1.sunday
                , monday = mealplan1.monday
                , tuesday = mealplan1.tuesday
                , wednesday = mealplan2.wednesday
                , thursday = mealplan2.thursday
                , friday = mealplan2.friday
                , saturday = mealplan2.saturday
                }
            else
                { sunday = mealplan2.sunday
                , monday = mealplan2.monday
                , tuesday = mealplan2.tuesday
                , wednesday = mealplan1.wednesday
                , thursday = mealplan1.thursday
                , friday = mealplan1.friday
                , saturday = mealplan1.saturday
                }
    in
        ( crossedMealplan, nextSeed )


mutateMealplan : ( MealPlan, Seed ) -> ( MealPlan, Seed )
mutateMealplan ( mealPlan, seed ) =
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


mutateDay : Day -> Seed -> ( Day, Seed )
mutateDay day seed =
    case day of
        Breakfast meal ->
            mutateBreakfastOnlyDay meal seed

        Lunch meal ->
            mutateLunchOnlyDay meal seed

        Dinner meal ->
            mutateDinnerOnlyDay meal seed

        BreakfastLunch meal meal2 ->
            mutateBreakfastLunchDay meal meal2 seed

        BreakfastDinner meal meal2 ->
            mutateBreakfastDinnerDay meal meal2 seed

        LunchDinner meal meal2 ->
            mutateLunchDinnerDay meal meal2 seed

        AllMeals meal meal2 meal3 ->
            mutateAllMealsDay meal meal2 meal3 seed

        NoMeals ->
            mutateNoMealsDay seed


mutateBreakfastOnlyDay : Meal -> Seed -> ( Day, Seed )
mutateBreakfastOnlyDay meal seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( NoMeals, nextSeed )
        else if actionId == 1 then
            ( Lunch meal, nextSeed )
        else if actionId == 2 then
            ( Dinner meal, nextSeed )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastLunch meal randomMeal, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastDinner meal randomMeal, nextSeed2 )
                   )


mutateLunchOnlyDay : Meal -> Seed -> ( Day, Seed )
mutateLunchOnlyDay meal seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( NoMeals, nextSeed )
        else if actionId == 1 then
            ( Breakfast meal, nextSeed )
        else if actionId == 2 then
            ( Dinner meal, nextSeed )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastLunch meal randomMeal, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( LunchDinner meal randomMeal, nextSeed2 )
                   )


mutateDinnerOnlyDay : Meal -> Seed -> ( Day, Seed )
mutateDinnerOnlyDay meal seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( NoMeals, nextSeed )
        else if actionId == 1 then
            ( Breakfast meal, nextSeed )
        else if actionId == 2 then
            ( Lunch meal, nextSeed )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( LunchDinner meal randomMeal, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastDinner meal randomMeal, nextSeed2 )
                   )


mutateBreakfastLunchDay : Meal -> Meal -> Seed -> ( Day, Seed )
mutateBreakfastLunchDay meal meal2 seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( Breakfast meal, nextSeed )
        else if actionId == 1 then
            ( Lunch meal2, nextSeed )
        else if actionId == 2 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastLunch meal randomMeal, nextSeed2 )
                   )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastLunch randomMeal meal2, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( AllMeals randomMeal meal2 randomMeal, nextSeed2 )
                   )


mutateBreakfastDinnerDay : Meal -> Meal -> Seed -> ( Day, Seed )
mutateBreakfastDinnerDay meal meal2 seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( Breakfast meal, nextSeed )
        else if actionId == 1 then
            ( Dinner meal2, nextSeed )
        else if actionId == 2 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastDinner meal randomMeal, nextSeed2 )
                   )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( BreakfastDinner randomMeal meal2, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( AllMeals randomMeal meal2 randomMeal, nextSeed2 )
                   )


mutateLunchDinnerDay : Meal -> Meal -> Seed -> ( Day, Seed )
mutateLunchDinnerDay meal meal2 seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 4) seed
    in
        if actionId == 0 then
            ( Lunch meal, nextSeed )
        else if actionId == 1 then
            ( Dinner meal2, nextSeed )
        else if actionId == 2 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( LunchDinner meal randomMeal, nextSeed2 )
                   )
        else if actionId == 3 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( LunchDinner randomMeal meal2, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( AllMeals randomMeal meal2 randomMeal, nextSeed2 )
                   )


mutateAllMealsDay : Meal -> Meal -> Meal -> Seed -> ( Day, Seed )
mutateAllMealsDay meal meal2 meal3 seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 2) seed
    in
        if actionId == 0 then
            ( LunchDinner meal2 meal3, nextSeed )
        else if actionId == 1 then
            ( BreakfastDinner meal meal3, nextSeed )
        else
            ( BreakfastLunch meal meal2, nextSeed )


mutateNoMealsDay : Seed -> ( Day, Seed )
mutateNoMealsDay seed =
    let
        ( actionId, nextSeed ) =
            Random.step (Random.int 0 2) seed
    in
        if actionId == 0 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( Breakfast randomMeal, nextSeed2 )
                   )
        else if actionId == 1 then
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( Lunch randomMeal, nextSeed2 )
                   )
        else
            getRandomMeal nextSeed
                |> (\( randomMeal, nextSeed2 ) ->
                        ( Dinner randomMeal, nextSeed2 )
                   )


getRandomMeal : Seed -> ( Meal, Seed )
getRandomMeal seed =
    Random.step randomMealGenerator seed


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


getPenaltyForDay : Day -> Float
getPenaltyForDay day =
    case day of
        Breakfast meal ->
            getBreakfastPenaltyFor meal

        Lunch meal ->
            getLunchPenaltyFor meal

        Dinner meal ->
            getDinnerPenaltyFor meal

        _ ->
            0


getBreakfastPenaltyFor : Meal -> Float
getBreakfastPenaltyFor meal =
    case meal.recipe.mealType of
        BreakfastType ->
            0

        BreakfastLunchType ->
            0

        _ ->
            8


getLunchPenaltyFor : Meal -> Float
getLunchPenaltyFor meal =
    case meal.recipe.mealType of
        LunchType ->
            0

        BreakfastLunchType ->
            0

        LunchDinnerType ->
            0

        _ ->
            8


getDinnerPenaltyFor : Meal -> Float
getDinnerPenaltyFor meal =
    case meal.recipe.mealType of
        DinnerType ->
            0

        LunchDinnerType ->
            0

        _ ->
            8
