module Advanced.Models.MealPlannerModel exposing (..)


type alias Food =
    { name : String
    , perPackage : Float
    , unit : String
    , cost : Float
    }


type alias Ingredient =
    { name : String
    , amount : Float
    }


type MealType
    = BreakfastType
    | LunchType
    | DinnerType
    | BreakfastLunchType
    | LunchDinnerType


type alias Recipe =
    { name : String
    , servings : Int
    , maxServings : Int
    , ingredients : List Ingredient
    , mealType : MealType
    }


type alias Meal =
    { recipe : Recipe
    , servingMultiplier : Float
    , isLeftover : Bool
    }


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
