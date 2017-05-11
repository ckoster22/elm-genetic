const Elm = require('./mealplanner');

Elm.MealPlanner.worker({
    currentTimeInMillis: (new Date()).getTime()
});
