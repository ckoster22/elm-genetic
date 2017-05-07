const Elm = require('./helloworld');

Elm.HelloWorld.worker({
    currentTimeInMillis: (new Date()).getTime()
});
