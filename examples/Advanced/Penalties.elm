module Penalties
    exposing
        ( getBreakfastPenaltyFor
        , getLunchPenaltyFor
        , getDinnerPenaltyFor
        )

import Models.Meal exposing (Meal, MealType(..))


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
