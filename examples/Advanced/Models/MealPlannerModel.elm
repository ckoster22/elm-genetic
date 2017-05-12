module Models.MealPlannerModel exposing (..)

import Models.Meal exposing (..)
import Random exposing (Generator, Seed)


type Day
    = Breakfast Meal
    | Lunch Meal
    | Dinner Meal
    | BreakfastLunch Meal Meal
    | BreakfastDinner Meal Meal
    | LunchDinner Meal Meal
    | AllMeals Meal Meal Meal
    | NoMeals


type alias MealPlan =
    { sunday : Day
    , monday : Day
    , tuesday : Day
    , wednesday : Day
    , thursday : Day
    , friday : Day
    , saturday : Day
    }


type alias Dna =
    MealPlan


getBreakfastMeal : Day -> Maybe Meal
getBreakfastMeal day =
    case day of
        Breakfast meal ->
            Just meal

        BreakfastLunch meal _ ->
            Just meal

        _ ->
            Nothing


getLunchMeal : Day -> Maybe Meal
getLunchMeal day =
    case day of
        BreakfastLunch _ meal ->
            Just meal

        Lunch meal ->
            Just meal

        LunchDinner meal _ ->
            Just meal

        _ ->
            Nothing


getDinnerMeal : Day -> Maybe Meal
getDinnerMeal day =
    case day of
        LunchDinner _ meal ->
            Just meal

        Dinner meal ->
            Just meal

        _ ->
            Nothing


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


mutateDay : Day -> Generator Day
mutateDay day =
    case day of
        Breakfast meal ->
            mutateBreakfastOnlyDay meal

        Lunch meal ->
            mutateLunchOnlyDay meal

        Dinner meal ->
            mutateDinnerOnlyDay meal

        BreakfastLunch meal meal2 ->
            mutateBreakfastLunchDay meal meal2

        BreakfastDinner meal meal2 ->
            mutateBreakfastDinnerDay meal meal2

        LunchDinner meal meal2 ->
            mutateLunchDinnerDay meal meal2

        AllMeals meal meal2 meal3 ->
            mutateAllMealsDay meal meal2 meal3

        NoMeals ->
            mutateNoMealsDay


mutateBreakfastOnlyDay : Meal -> Generator Day
mutateBreakfastOnlyDay meal =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                NoMeals
            else if actionId == 1 then
                Lunch meal
            else if actionId == 2 then
                Dinner meal
            else if actionId == 3 then
                BreakfastLunch meal randomMeal
            else
                BreakfastDinner meal randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateLunchOnlyDay : Meal -> Generator Day
mutateLunchOnlyDay meal =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                NoMeals
            else if actionId == 1 then
                Breakfast meal
            else if actionId == 2 then
                Dinner meal
            else if actionId == 3 then
                BreakfastLunch meal randomMeal
            else
                LunchDinner meal randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateDinnerOnlyDay : Meal -> Generator Day
mutateDinnerOnlyDay meal =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                NoMeals
            else if actionId == 1 then
                Breakfast meal
            else if actionId == 2 then
                Lunch meal
            else if actionId == 3 then
                LunchDinner meal randomMeal
            else
                BreakfastDinner meal randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateBreakfastLunchDay : Meal -> Meal -> Generator Day
mutateBreakfastLunchDay meal meal2 =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                Breakfast meal
            else if actionId == 1 then
                Lunch meal2
            else if actionId == 2 then
                BreakfastLunch meal randomMeal
            else if actionId == 3 then
                BreakfastLunch randomMeal meal2
            else
                AllMeals randomMeal meal2 randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateBreakfastDinnerDay : Meal -> Meal -> Generator Day
mutateBreakfastDinnerDay meal meal2 =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                Breakfast meal
            else if actionId == 1 then
                Dinner meal2
            else if actionId == 2 then
                BreakfastDinner meal randomMeal
            else if actionId == 3 then
                BreakfastDinner randomMeal meal2
            else
                AllMeals randomMeal meal2 randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateLunchDinnerDay : Meal -> Meal -> Generator Day
mutateLunchDinnerDay meal meal2 =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                Lunch meal
            else if actionId == 1 then
                Dinner meal2
            else if actionId == 2 then
                LunchDinner meal randomMeal
            else if actionId == 3 then
                LunchDinner randomMeal meal2
            else
                AllMeals randomMeal meal2 randomMeal
        )
        (Random.int 0 4)
        randomMealGenerator


mutateAllMealsDay : Meal -> Meal -> Meal -> Generator Day
mutateAllMealsDay meal meal2 meal3 =
    Random.int 0 2
        |> Random.map
            (\actionId ->
                if actionId == 0 then
                    LunchDinner meal2 meal3
                else if actionId == 1 then
                    BreakfastDinner meal meal3
                else
                    BreakfastLunch meal meal2
            )


mutateNoMealsDay : Generator Day
mutateNoMealsDay =
    Random.map2
        (\actionId randomMeal ->
            if actionId == 0 then
                Breakfast randomMeal
            else if actionId == 1 then
                Lunch randomMeal
            else
                Dinner randomMeal
        )
        (Random.int 0 2)
        randomMealGenerator
