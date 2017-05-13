module Models.Meal
    exposing
        ( Meal
        , randomMealGenerator
        , MealType(..)
          -- TODO don't expose this
        )

import Random exposing (Generator)
import List.Nonempty as NonemptyList exposing (Nonempty)


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


allRecipes : Nonempty Recipe
allRecipes =
    let
        firstRecipe =
            NonemptyList.fromElement
                { name = "Frozen pizza"
                , servings = 3
                , maxServings = 3
                , ingredients = [ { name = "Frozen pizza", amount = 1 } ]
                , mealType = LunchDinnerType
                }
    in
        List.foldl
            NonemptyList.cons
            firstRecipe
            [ { name = "Frozen Chinese General's Chicken"
              , servings = 2
              , maxServings = 2
              , ingredients = [ { name = "Frozen Chinese General's Chicken", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Chicken cordon bleu"
              , servings = 1
              , maxServings = 2
              , ingredients = [ { name = "Chicken cordon bleu", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled cheese sandwiches"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Sliced American cheese", amount = 4 }, { name = "Sliced white bread", amount = 6 }, { name = "Butter", amount = 0.5 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled ham and cheese sandwiches"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Sliced American cheese", amount = 4 }, { name = "Sliced white bread", amount = 6 }, { name = "Butter", amount = 0.5 }, { name = "Deli ham", amount = 0.125 } ]
              , mealType = LunchDinnerType
              }
            , { name = "French toast"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Sliced white bread", amount = 6 }, { name = "Butter", amount = 0.5 }, { name = "Milk", amount = 1 }, { name = "Eggs", amount = 1 } ]
              , mealType = BreakfastType
              }
            , { name = "Cereal"
              , servings = 1
              , maxServings = 2
              , ingredients = [ { name = "Milk", amount = 0.125 }, { name = "Cereal", amount = 0.06125 } ]
              , mealType = BreakfastType
              }
            , { name = "Philly cheese steak"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Philly steak meat", amount = 1 }, { name = "Hoagie buns", amount = 2 }, { name = "Sliced provolone", amount = 3 }, { name = "Green pepper", amount = 0.5 }, { name = "White onion", amount = 0.125 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Scrambled eggs"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Eggs", amount = 3 }, { name = "Milk", amount = 0.125 } ]
              , mealType = BreakfastType
              }
            , { name = "Buffalo chicken wraps"
              , servings = 2
              , maxServings = 4
              , ingredients = [ { name = "Large tortilla", amount = 2 }, { name = "Shredded lettuce", amount = 2 }, { name = "Chicken breast", amount = 0.5 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Tacos"
              , servings = 2
              , maxServings = 5
              , ingredients = [ { name = "Large tortilla", amount = 2 }, { name = "White onion", amount = 0.125 }, { name = "Shredded lettuce", amount = 2 }, { name = "Ground Beef", amount = 0.5 }, { name = "Taco seasoning", amount = 1 }, { name = "Green onion", amount = 0.125 }, { name = "Mexican taco cheese", amount = 2 }, { name = "Sour cream", amount = 2 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Walking tacos"
              , servings = 2
              , maxServings = 5
              , ingredients = [ { name = "White onion", amount = 0.125 }, { name = "Shredded lettuce", amount = 2 }, { name = "Ground Beef", amount = 0.5 }, { name = "Taco seasoning", amount = 1 }, { name = "Green onion", amount = 0.125 }, { name = "Mexican taco cheese", amount = 2 }, { name = "Sour cream", amount = 2 }, { name = "Doritos", amount = 0.125 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Fajitas"
              , servings = 4
              , maxServings = 4
              , ingredients = [ { name = "Large tortilla", amount = 4 }, { name = "Green pepper", amount = 1 }, { name = "Red pepper", amount = 1 }, { name = "White onion", amount = 0.33 }, { name = "Chicken breast", amount = 1 }, { name = "Shredded lettuce", amount = 3 }, { name = "Fajita seasoning", amount = 1 }, { name = "Mexican taco cheese", amount = 3 }, { name = "Sour cream", amount = 3 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Quesadillas"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Large tortilla", amount = 2 }, { name = "White onion", amount = 0.125 }, { name = "Chicken breast", amount = 0.5 }, { name = "Green onion", amount = 0.125 }, { name = "Mexican taco cheese", amount = 6 }, { name = "Sour cream", amount = 2 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Chili"
              , servings = 12
              , maxServings = 12
              , ingredients = [ { name = "Green pepper", amount = 1 }, { name = "Red pepper", amount = 1 }, { name = "White onion", amount = 1 }, { name = "Ground Beef", amount = 3 }, { name = "Ground sausage", amount = 1 }, { name = "Tomato paste", amount = 6 }, { name = "Diced tomatoes", amount = 56 }, { name = "Chili Beans", amount = 31 }, { name = "Shredded cheddar cheese", amount = 8 }, { name = "Fritos", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Waffles"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Milk", amount = 1.5 }, { name = "Waffle mix", amount = 4.5 } ]
              , mealType = BreakfastType
              }
            , { name = "Breakfast sandwich"
              , servings = 1
              , maxServings = 2
              , ingredients = [ { name = "Sliced white bread", amount = 2 }, { name = "Butter", amount = 0.25 }, { name = "Sliced provolone", amount = 1 }, { name = "Avocado", amount = 0.5 }, { name = "Eggs", amount = 1 }, { name = "Bacon", amount = 2 } ]
              , mealType = BreakfastLunchType
              }
            , { name = "Gyros"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Flank steak", amount = 1 }, { name = "Feta cheese", amount = 2 }, { name = "Pita bread", amount = 4 }, { name = "Greek yogurt", amount = 5.3 }, { name = "White onion", amount = 0.125 }, { name = "Tomato", amount = 0.5 }, { name = "Cucumber", amount = 0.33 }, { name = "Lemon", amount = 0.25 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Deli sandwiches"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Sliced American cheese", amount = 2 }, { name = "Sliced white bread", amount = 4 }, { name = "Deli ham", amount = 0.25 }, { name = "Deli turkey", amount = 0.25 }, { name = "White onion", amount = 0.125 }, { name = "Lettuce", amount = 0.2 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Beef and broccoli"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Soy sauce", amount = 7 }, { name = "Flank steak", amount = 1 }, { name = "Broccoli", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Loaded salad"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Chicken breast", amount = 0.5 }, { name = "Spinach", amount = 3 }, { name = "Avocado", amount = 0.5 }, { name = "Tomato", amount = 0.25 }, { name = "Cucumber", amount = 0.125 }, { name = "Carrots", amount = 2 }, { name = "Feta cheese", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Spaghetti"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Ground Beef", amount = 0.5 }, { name = "Spaghetti noodles", amount = 16 }, { name = "Tomato sauce", amount = 15 }, { name = "Tomato paste", amount = 6 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Lasagna"
              , servings = 4
              , maxServings = 4
              , ingredients = [ { name = "Ground Beef", amount = 1 }, { name = "Tomato sauce", amount = 15 }, { name = "Tomato paste", amount = 6 }, { name = "Lasagna noodles", amount = 16 }, { name = "Shredded mozzarella cheese", amount = 8 }, { name = "Cottage cheese", amount = 12 } ]
              , mealType = DinnerType
              }
            , { name = "Chicken alfredo"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Chicken breast", amount = 0.5 }, { name = "Alfredo sauce", amount = 15 }, { name = "Fettuccine noodles", amount = 8 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Shrimp alfredo"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Alfredo sauce", amount = 15 }, { name = "Frozen shrimp", amount = 1 }, { name = "Fettuccine noodles", amount = 8 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Chicken parmesan"
              , servings = 3
              , maxServings = 4
              , ingredients = [ { name = "Chicken breast", amount = 1.5 }, { name = "Tomato sauce", amount = 15 }, { name = "Tomato paste", amount = 6 }, { name = "Bread crumbs", amount = 2.5 }, { name = "Spaghetti noodles", amount = 16 } ]
              , mealType = DinnerType
              }
            , { name = "Cheese ravioli"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Cheese ravioli", amount = 24 }, { name = "Tomato sauce", amount = 15 }, { name = "Tomato paste", amount = 6 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Pizza smothered chicken"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Chicken breast", amount = 1.5 }, { name = "Pizza sauce", amount = 10 }, { name = "Pepperoni", amount = 0.125 }, { name = "Shredded mozzarella cheese", amount = 1 } ]
              , mealType = DinnerType
              }
            , { name = "Pigs in a blanket"
              , servings = 4
              , maxServings = 4
              , ingredients = [ { name = "Sliced American cheese", amount = 2 }, { name = "Crescent roles", amount = 1 }, { name = "Hot dogs", amount = 4 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Salmon"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Salmon", amount = 0.5 }, { name = "Asparagus", amount = 0.5 } ]
              , mealType = DinnerType
              }
            , { name = "Homemade pepperoni & beef pizza"
              , servings = 4
              , maxServings = 4
              , ingredients = [ { name = "Ground Beef", amount = 1 }, { name = "Pizza sauce", amount = 15 }, { name = "Pepperoni", amount = 0.5 }, { name = "Pizza dough", amount = 1 }, { name = "Shredded mozzarella cheese", amount = 12 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Homemade bbq chicken pizza"
              , servings = 4
              , maxServings = 4
              , ingredients = [ { name = "Pizza dough", amount = 1 }, { name = "Chicken breast", amount = 0.5 }, { name = "BBQ sauce", amount = 20 }, { name = "Shredded mozzarella cheese", amount = 12 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled steak"
              , servings = 2
              , maxServings = 3
              , ingredients = [ { name = "Ribeye steak", amount = 16 } ]
              , mealType = DinnerType
              }
            , { name = "Grilled burgers"
              , servings = 3
              , maxServings = 4
              , ingredients = [ { name = "Sliced American cheese", amount = 3 }, { name = "Hamburger buns", amount = 3 }, { name = "White onion", amount = 0.125 }, { name = "Lettuce", amount = 0.125 }, { name = "Ground Beef", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled bacon cheddar brat"
              , servings = 1
              , maxServings = 4
              , ingredients = [ { name = "Hot dog buns", amount = 1 }, { name = "Bacon cheddar brat", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled pineapple brat"
              , servings = 1
              , maxServings = 4
              , ingredients = [ { name = "Hot dog buns", amount = 1 }, { name = "Pineapple brat", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Grilled hot dogs"
              , servings = 1
              , maxServings = 4
              , ingredients = [ { name = "Hot dog buns", amount = 1 }, { name = "Hot dogs", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            , { name = "Chicken burgers"
              , servings = 3
              , maxServings = 3
              , ingredients = [ { name = "Hamburger buns", amount = 3 }, { name = "Sliced provolone", amount = 3 }, { name = "Ground chicken", amount = 1 } ]
              , mealType = LunchDinnerType
              }
            ]
