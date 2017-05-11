module NonemptyHelper exposing (randomNonemptyList)

import List.Nonempty as NonemptyList exposing (Nonempty)
import Random exposing (Generator)


randomNonemptyList : Int -> Generator a -> Generator (Nonempty a)
randomNonemptyList size generator =
    Random.map2 (List.foldl NonemptyList.cons)
        (Random.map (NonemptyList.fromElement) generator)
        (Random.list (size - 1) generator)
