module Genetic.StepValue
    exposing
        ( PointedDna
        , StepValue
        , new
        , points
        , solution
        , solutions
        )

import List.Nonempty as Nonempty exposing (Nonempty)


type StepValue a
    = StepValue (Nonempty a) a


type alias PointedDna dna =
    { dna : dna
    , points : Float
    }


new : Nonempty (PointedDna a) -> PointedDna a -> StepValue (PointedDna a)
new =
    StepValue


solutions : StepValue (PointedDna a) -> Nonempty (PointedDna a)
solutions stepValue =
    case stepValue of
        StepValue solutions _ ->
            solutions


solution : StepValue (PointedDna a) -> PointedDna a
solution stepValue =
    case stepValue of
        StepValue solutions best ->
            best


points : StepValue (PointedDna a) -> Float
points stepValue =
    case stepValue of
        StepValue _ best ->
            best.points
