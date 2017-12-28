module Genetic.StepValue
    exposing
        ( Pointed
        , StepValue
        , new
        , points
        , solution
        , solutions
        )

import List.Nonempty as Nonempty exposing (Nonempty)


type StepValue a
    = StepValue (Nonempty a) a


type alias Pointed a =
    { a | points : Float }


new : Nonempty (Pointed a) -> Pointed a -> StepValue (Pointed a)
new =
    StepValue


solutions : StepValue (Pointed a) -> Nonempty (Pointed a)
solutions stepValue =
    case stepValue of
        StepValue solutions _ ->
            solutions


solution : StepValue (Pointed a) -> Pointed a
solution stepValue =
    case stepValue of
        StepValue solutions best ->
            best


points : StepValue (Pointed a) -> Float
points stepValue =
    case stepValue of
        StepValue _ best ->
            best.points
