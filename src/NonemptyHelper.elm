module NonemptyHelper exposing (fromHeadRest, randomNonemptyList)

import List.Nonempty as Nonempty exposing (Nonempty)
import Random exposing (Generator, Seed)


randomNonemptyList : Int -> Seed -> Generator a -> ( Nonempty a, Seed )
randomNonemptyList size seed generator =
    let
        ( head, seed2 ) =
            Random.step generator seed
    in
    Random.step (Random.list (size - 1) generator) seed2
        |> constructNonemptyFromHead head size


constructNonemptyFromHead : a -> Int -> ( List a, Seed ) -> ( Nonempty a, Seed )
constructNonemptyFromHead thing size ( things, seed ) =
    let
        headList =
            Nonempty.fromElement thing

        entireList =
            List.foldl
                (\item nonemptyList ->
                    Nonempty.cons item nonemptyList
                )
                headList
                things
    in
    ( entireList, seed )


fromHeadRest : a -> List a -> Nonempty a
fromHeadRest head rest =
    List.foldl
        (\item nonemptyList ->
            Nonempty.cons item nonemptyList
        )
        (Nonempty.fromElement head)
        rest
