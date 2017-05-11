module Advanced.MealPlannerData exposing (..)

import Dict exposing (Dict)
import Advanced.Models.MealPlannerModel exposing (Food, Recipe, MealType(..))
import List.Nonempty as NonemptyList exposing (Nonempty)


allFood : Dict String Food
allFood =
    Dict.fromList
        [ ( "Cereal"
          , { name = "Cereal"
            , perPackage = 1
            , unit = "box"
            , cost = 3.5
            }
          )
        , ( "Sliced American cheese"
          , { name = "Sliced American cheese"
            , perPackage = 24
            , unit = "slice"
            , cost = 3.79
            }
          )
        , ( "Sliced provolone"
          , { name = "Sliced provolone"
            , perPackage = 10
            , unit = "slice"
            , cost = 2.99
            }
          )
        , ( "Milk"
          , { name = "Milk"
            , perPackage = 8
            , unit = "cup"
            , cost = 2.29
            }
          )
        , ( "Feta cheese"
          , { name = "Feta cheese"
            , perPackage = 4
            , unit = "ounce"
            , cost = 3.49
            }
          )
        , ( "Mexican taco cheese"
          , { name = "Mexican taco cheese"
            , perPackage = 8
            , unit = "ounce"
            , cost = 2.59
            }
          )
        , ( "Shredded mozzarella cheese"
          , { name = "Shredded mozzarella cheese"
            , perPackage = 8
            , unit = "ounce"
            , cost = 2.69
            }
          )
        , ( "Shredded cheddar cheese"
          , { name = "Shredded cheddar cheese"
            , perPackage = 8
            , unit = "ounce"
            , cost = 2.59
            }
          )
        , ( "Cottage cheese"
          , { name = "Cottage cheese"
            , perPackage = 12
            , unit = "ounce"
            , cost = 1.79
            }
          )
        , ( "Greek yogurt"
          , { name = "Greek yogurt"
            , perPackage = 5.3
            , unit = "ounce"
            , cost = 1.19
            }
          )
        , ( "Green pepper"
          , { name = "Green pepper"
            , perPackage = 1
            , unit = "item"
            , cost = 1.5
            }
          )
        , ( "Red pepper"
          , { name = "Red pepper"
            , perPackage = 1
            , unit = "item"
            , cost = 1.5
            }
          )
        , ( "White onion"
          , { name = "White onion"
            , perPackage = 1
            , unit = "item"
            , cost = 0.77
            }
          )
        , ( "Red onion"
          , { name = "Red onion"
            , perPackage = 1
            , unit = "item"
            , cost = 1.16
            }
          )
        , ( "Shredded lettuce"
          , { name = "Shredded lettuce"
            , perPackage = 8
            , unit = "ounce"
            , cost = 1.99
            }
          )
        , ( "Lettuce"
          , { name = "Lettuce"
            , perPackage = 1
            , unit = "item"
            , cost = 2.49
            }
          )
        , ( "Green onion"
          , { name = "Green onion"
            , perPackage = 1
            , unit = "item"
            , cost = 0.99
            }
          )
        , ( "Avocado"
          , { name = "Avocado"
            , perPackage = 1
            , unit = "item"
            , cost = 1.5
            }
          )
        , ( "Asparagus"
          , { name = "Asparagus"
            , perPackage = 1
            , unit = "item"
            , cost = 3.69
            }
          )
        , ( "Tomato"
          , { name = "Tomato"
            , perPackage = 1
            , unit = "item"
            , cost = 0.35
            }
          )
        , ( "Cucumber"
          , { name = "Cucumber"
            , perPackage = 1
            , unit = "item"
            , cost = 0.99
            }
          )
        , ( "Broccoli"
          , { name = "Broccoli"
            , perPackage = 1
            , unit = "item"
            , cost = 2.39
            }
          )
        , ( "Spinach"
          , { name = "Spinach"
            , perPackage = 5
            , unit = "ounce"
            , cost = 3.99
            }
          )
        , ( "Carrots"
          , { name = "Carrots"
            , perPackage = 16
            , unit = "ounce"
            , cost = 1.79
            }
          )
        , ( "Lemon"
          , { name = "Lemon"
            , perPackage = 1
            , unit = "item"
            , cost = 0.69
            }
          )
        , ( "Tomato sauce"
          , { name = "Tomato sauce"
            , perPackage = 15
            , unit = "ounce"
            , cost = 0.89
            }
          )
        , ( "Tomato paste"
          , { name = "Tomato paste"
            , perPackage = 6
            , unit = "ounce"
            , cost = 0.59
            }
          )
        , ( "Diced tomatoes"
          , { name = "Diced tomatoes"
            , perPackage = 28
            , unit = "ounce"
            , cost = 1.69
            }
          )
        , ( "Alfredo sauce"
          , { name = "Alfredo sauce"
            , perPackage = 15
            , unit = "ounce"
            , cost = 1.99
            }
          )
        , ( "BBQ sauce"
          , { name = "BBQ sauce"
            , perPackage = 20
            , unit = "ounce"
            , cost = 2.29
            }
          )
        , ( "Soy sauce"
          , { name = "Soy sauce"
            , perPackage = 10
            , unit = "ounce"
            , cost = 2.19
            }
          )
        , ( "Pizza sauce"
          , { name = "Pizza sauce"
            , perPackage = 15
            , unit = "ounce"
            , cost = 1.69
            }
          )
        , ( "Large tortilla"
          , { name = "Large tortilla"
            , perPackage = 10
            , unit = "tortilla"
            , cost = 3.19
            }
          )
        , ( "Sliced white bread"
          , { name = "Sliced white bread"
            , perPackage = 24
            , unit = "slice"
            , cost = 2.79
            }
          )
        , ( "Hoagie buns"
          , { name = "Hoagie buns"
            , perPackage = 6
            , unit = "hoagie"
            , cost = 3.19
            }
          )
        , ( "Hot dog buns"
          , { name = "Hot dog buns"
            , perPackage = 8
            , unit = "bun"
            , cost = 2.59
            }
          )
        , ( "Hamburger buns"
          , { name = "Hamburger buns"
            , perPackage = 8
            , unit = "bun"
            , cost = 1.79
            }
          )
        , ( "Spaghetti noodles"
          , { name = "Spaghetti noodles"
            , perPackage = 32
            , unit = "ounce"
            , cost = 2.49
            }
          )
        , ( "Lasagna noodles"
          , { name = "Lasagna noodles"
            , perPackage = 16
            , unit = "ounce"
            , cost = 1.99
            }
          )
        , ( "Fettuccine noodles"
          , { name = "Fettuccine noodles"
            , perPackage = 16
            , unit = "ounce"
            , cost = 1.29
            }
          )
        , ( "Cheese ravioli"
          , { name = "Cheese ravioli"
            , perPackage = 24
            , unit = "ounce"
            , cost = 3.77
            }
          )
        , ( "Crescent roles"
          , { name = "Crescent roles"
            , perPackage = 1
            , unit = "item"
            , cost = 2.88
            }
          )
        , ( "Pizza dough"
          , { name = "Pizza dough"
            , perPackage = 1
            , unit = "item"
            , cost = 2.88
            }
          )
        , ( "Pita bread"
          , { name = "Pita bread"
            , perPackage = 6
            , unit = "pita"
            , cost = 3.29
            }
          )
        , ( "Bread crumbs"
          , { name = "Bread crumbs"
            , perPackage = 10
            , unit = "ounce"
            , cost = 1.59
            }
          )
        , ( "Butter"
          , { name = "Butter"
            , perPackage = 13
            , unit = "ounce"
            , cost = 4.69
            }
          )
        , ( "Eggs"
          , { name = "Eggs"
            , perPackage = 12
            , unit = "item"
            , cost = 3.99
            }
          )
        , ( "Taco seasoning"
          , { name = "Taco seasoning"
            , perPackage = 1
            , unit = "item"
            , cost = 0.99
            }
          )
        , ( "Fajita seasoning"
          , { name = "Fajita seasoning"
            , perPackage = 1
            , unit = "item"
            , cost = 1.0
            }
          )
        , ( "Frozen pizza"
          , { name = "Frozen pizza"
            , perPackage = 1
            , unit = "item"
            , cost = 3.97
            }
          )
        , ( "P.F. Chang's General's Chicken"
          , { name = "P.F. Chang's General's Chicken"
            , perPackage = 1
            , unit = "item"
            , cost = 7.49
            }
          )
        , ( "Chicken cordon bleu"
          , { name = "Chicken cordon bleu"
            , perPackage = 1
            , unit = "item"
            , cost = 3.98
            }
          )
        , ( "Sour cream"
          , { name = "Sour cream"
            , perPackage = 8
            , unit = "ounce"
            , cost = 0.79
            }
          )
        , ( "Doritos"
          , { name = "Doritos"
            , perPackage = 1
            , unit = "item"
            , cost = 4.29
            }
          )
        , ( "Fritos"
          , { name = "Fritos"
            , perPackage = 1
            , unit = "item"
            , cost = 3.0
            }
          )
        , ( "Chili Beans"
          , { name = "Chili Beans"
            , perPackage = 15.5
            , unit = "ounce"
            , cost = 0.79
            }
          )
        , ( "Waffle mix"
          , { name = "Waffle mix"
            , perPackage = 32
            , unit = "ounce"
            , cost = 2.19
            }
          )
        , ( "Deli ham"
          , { name = "Deli ham"
            , perPackage = 1
            , unit = "pound"
            , cost = 7.99
            }
          )
        , ( "Deli turkey"
          , { name = "Deli turkey"
            , perPackage = 1
            , unit = "pound"
            , cost = 9.99
            }
          )
        , ( "Philly steak meat"
          , { name = "Philly steak meat"
            , perPackage = 1
            , unit = "item"
            , cost = 4.99
            }
          )
        , ( "Chicken breast"
          , { name = "Chicken breast"
            , perPackage = 1
            , unit = "pounds"
            , cost = 7.64
            }
          )
        , ( "Ground Beef"
          , { name = "Ground Beef"
            , perPackage = 3
            , unit = "pound"
            , cost = 2.99
            }
          )
        , ( "Ground sausage"
          , { name = "Ground sausage"
            , perPackage = 1
            , unit = "pound"
            , cost = 4.49
            }
          )
        , ( "Ground chicken"
          , { name = "Ground chicken"
            , perPackage = 1
            , unit = "pound"
            , cost = 6.49
            }
          )
        , ( "Flank steak"
          , { name = "Flank steak"
            , perPackage = 1
            , unit = "pound"
            , cost = 11.98
            }
          )
        , ( "Salmon"
          , { name = "Salmon"
            , perPackage = 2
            , unit = "pound"
            , cost = 12.99
            }
          )
        , ( "Ribeye steak"
          , { name = "Ribeye steak"
            , perPackage = 8
            , unit = "ounce"
            , cost = 7.99
            }
          )
        , ( "Bacon cheddar brat"
          , { name = "Bacon cheddar brat"
            , perPackage = 1
            , unit = "item"
            , cost = 1.0
            }
          )
        , ( "Pineapple brat"
          , { name = "Pineapple brat"
            , perPackage = 1
            , unit = "item"
            , cost = 1.0
            }
          )
        , ( "Pepperoni"
          , { name = "Pepperoni"
            , perPackage = 1
            , unit = "item"
            , cost = 2.99
            }
          )
        , ( "Frozen shrimp"
          , { name = "Frozen shrimp"
            , perPackage = 2
            , unit = "pounds"
            , cost = 16.99
            }
          )
        , ( "Hot dogs"
          , { name = "Hot dogs"
            , perPackage = 8
            , unit = "item"
            , cost = 2.99
            }
          )
        , ( "Bacon"
          , { name = "Bacon"
            , perPackage = 12
            , unit = "ounce"
            , cost = 4.79
            }
          )
        ]


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
