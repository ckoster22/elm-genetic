module Main exposing (main)

import Html exposing (Html, text)


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model = initialModel
        , view = view
        , update = update
        }


type alias Model =
    {}


type Msg
    = NoOp


initialModel : Model
initialModel =
    {}


view : Model -> Html Msg
view model =
    text "Hello world"


update : Msg -> Model -> Model
update msg model =
    model
