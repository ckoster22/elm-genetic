module Genetic.StepValue
    exposing
        ( StepValue
        , new
        , points
        , solution
        , solutions
        )

import List.Nonempty as NonemptyList exposing (Nonempty)


type StepValue a b
    = StepValue (Nonempty a) b Float


new : Nonempty a -> b -> Float -> StepValue a b
new solutions best bestPoints =
    StepValue solutions best bestPoints


solutions : StepValue a b -> Nonempty a
solutions stepValue =
    case stepValue of
        StepValue solutions _ _ ->
            solutions


solution : StepValue a b -> b
solution stepValue =
    case stepValue of
        StepValue _ solution _ ->
            solution


points : StepValue a b -> Float
points stepValue =
    case stepValue of
        StepValue _ _ points ->
            points
