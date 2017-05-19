# Hello world example

The "Hello world" of genetic algorithms is still quite large. What follows is a detailed explanation of why so much is required even for trivial examples.

#### tl;dr let's run it

From the root of the project..

`elm-make ./examples/helloworld/HelloWorld.elm --output ./examples/helloworld/helloworld.js`

`node ./examples/helloworld/index.js`

### Explanation

#### 1. What is the problem we're trying to solve?

We'd like to produce the phrase "Hello world"

#### 2. How are we going to represent the "dna"?

In this example the dna will be represented by a collection of ASCII codes that is exactly the same length of our target string.

``` elm
type alias Dna =
    List Int
```

This could easily be represented by a plain old string, but this example doesn't do that in order to help demonstrate that the expression of the solution's genes are not necessarily equivalent to the actual genes.

#### 3. What is our fitness function?

For a given **dna** (a possible solution to the above stated problem) we need to provide a score that tells the algorithm how close that solution is to the theoretical ideal solution.

Earlier we stated that the length of the ASCII code list will be exactly equal to the length of our target string, "Hello world". One way to provide a score is first to turn our target string into an ascii list..

``` elm
target : String
target =
    "Hello world"


target_ascii : List Int
target_ascii =
    String.toList target
        |> List.map Char.toCode
```

.. and then we provide a function that will sum the difference in ascii code values letter-by-letter.

``` elm
scoreOrganism : Dna -> Float
scoreOrganism dna =
    target_ascii
        |> Array.fromList
        |> Array.foldl
            (\asciiCode ( score, index ) ->
                let
                    organismAscii_ =
                        dna
                            |> Array.fromList
                            |> Array.get index
                in
                    case organismAscii_ of
                        Just organismAscii ->
                            ( score + abs (organismAscii - asciiCode), index + 1 )

                        Nothing ->
                            Debug.crash "Organism dna is too short!"
            )
            ( 0, 0 )
        |> Tuple.first
        |> toFloat
```

### **Stop**. Are you able to answer the above 3 questions?

If you can't answer one or more of the above questions then a genetic algorithm is not appropriate for the problem you're trying to solve.

If you can answer the above questions, continue on..

## Provide a few more helper functions to the algorithm

The algorithm needs a few more details in order to run.

1. How are random solutions generated?
2. How are two potential solutions bred and mutated?
3. When does the algorithm stop?
4. What's the initial random seed?

### Provide a Random.Generator for your Dna

In this example the only characters allowed are a-z, A-Z, and the space character. That's 53 characters total that need to be mapped as actual ASCII codes.

``` elm
randomDnaGenerator : Generator Dna
randomDnaGenerator =
    Random.int 1 53
        |> Random.map asciiCodeMapper
        |> Random.list (String.length target)


asciiCodeMapper : Int -> Int
asciiCodeMapper code =
    if code < 27 then
        code + 64
    else if code /= 53 then
        code + 70
    else
        32
```

### Define crossover and mutation functions

Crossover is what happens when two organisms breed. Mutation is when some part of the dna randomly changes.

When crossover and mutation are applied to produce new dna the result could have no effect, it could be worse, or it could be beneficial (in terms of score). When this step produces dna that gives the solution a better score that makes the solution/organism more likely to continue and pass its genes on to the next generation.

#### Crossover

Crossing over is the act of taking some dna from one parent, taking some dna from another parent, and producing a valid strand of child dna. Usually a *pivot* is defined that tells us everything before this point we get from one parent and everything after this point we get from the other parent.

Pivots are highly dependent upon the data structure of your dna. Since our dna is a List we'll pivot at the index halfway through the list.

*Note: If your data structure was something else like a binary tree, or a record with multiple lists, etc, then the "pivot" may not be as simple as an integer.*

``` elm
crossover_split_index =
    floor ((toFloat (String.length target)) / 2)

crossoverDnas : Dna -> Dna -> Dna
crossoverDnas dna1 dna2 =
    let
        ( dnaPart1, dnaPart2 ) =
            ( List.take crossover_split_index dna1, List.drop crossover_split_index dna2 )
    in
        List.append dnaPart1 dnaPart2
```

#### Mutation

Mutation is the act of randomly changing a gene. The amount of genetic material that gets mutated can highly influence the efficiency of the algorithm. Generally speaking, a **high mutation rate** causes too much variance and the algorithm will be unable to hone in on an optimal solution. An **extremely low mutation rate** may cause the algorithm to optimize on a local minima or maxima, or take longer than necessary to find a global minima or maxima.

There are a lot of opinions on mutation rates.. but I've seen 3% - 10% work well.

Since "Hello world" is 11 characters in length we're going to mutate only one letter. 1 / 11 = 9.1% which is in the 3% to 10% range.

``` elm
mutateDna : Dna -> Generator Dna
mutateDna dna =
    let
        randIndexGenerator =
            Random.int 0 (String.length target - 1)

        randAsciiCodeGenerator =
            Random.int 1 53
                |> Random.map asciiCodeMapper
    in
        Random.map2
            (\randomIndex randomAsciiCode ->
                dna
                    |> List.indexedMap
                        (\index asciiCode ->
                            if index == randomIndex then
                                randomAsciiCode
                            else
                                asciiCode
                        )
            )
            randIndexGenerator
            randAsciiCodeGenerator
```

### Define a function to stop the recursion

The algorithm will run forever if you let it. To prevent this, on every step of execution the algorithm will call your `isDoneEvolving` function with the dna of the best potential solution so far, the score that dna produced, and the current generation number.

With this information we can determine whether the given solution is good enough or if the algorithm has run long enough. For this example the algorithm stops when the score is 0 (there is no difference between the ASCII codes of our solution and the target string) or we exceed an arbitrary number of iterations.

``` elm
max_iterations : Int
max_iterations =
    3000

isDoneEvolving : Dna -> Float -> Int -> Bool
isDoneEvolving bestDna bestDnaScore numGenerations =
    bestDnaScore == 0 || numGenerations >= max_iterations

```

### Last of all, provide an initial random seed

There are two ways to do randomness in Elm. One is by using a `Cmd` and TEA. The other is manually by called [Random.step](http://package.elm-lang.org/packages/elm-lang/core/5.1.1/Random#step).

The algorithm uses the `Random.step` function which requires a seed, and so the `evolveSolution` function does too.

``` elm
evolveSolution
    { randomDnaGenerator = ..
    , scoreOrganism = ..
    , crossoverDnas = ..
    , mutateDna = ..
    , isDoneEvolving = ..
    , initialSeed = Random.initialSeed model.initialSeed
    }
```

This initial seed is acquired from the current time in Javascript.

``` js
Elm.HelloWorld.worker((new Date()).getTime());
```

It might be a good idea to record the seed somewhere each time you run the program as it can be very useful when debugging to run the program again with the exact same random values.