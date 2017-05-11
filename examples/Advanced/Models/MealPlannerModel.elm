module Advanced.Models.MealPlannerModel exposing (..)

import Advanced.Models.Meal exposing (..)
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
