const Elm = require('./main');

Elm.Main.worker({
    currentTimeInMillis: (new Date()).getTime()
});
