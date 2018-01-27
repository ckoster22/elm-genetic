# How to run

Change directory to to `examples/imageevolver`

Run `elm-reactor`

Open `http://localhost:8000/BugsBunny.elm` in your browser and open the dev tools console. Warning, it will take a long time to run.

# Notes

This example uses a Native module. Generally, this is not a great idea but I needed a way to ask the canvas for its pixels and Elm doesn't provide this functionality.

I also purposely use `Process.sleep 1` to allow the screen to redraw between each generation. It goes without saying that that is also a bad idea. Do not copy and paste.