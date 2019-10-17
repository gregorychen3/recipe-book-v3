const axios = require("axios");
const fs = require("fs");
const oldRecipes = JSON.parse(fs.readFileSync("./backups/10_15_2019.json"));

const getCourse = oldCourse => {
  switch (oldCourse) {
    case "desserts":
      return "dolci";
    case "sides":
      return "contorni";
    default:
      return oldCourse;
  }
};

const getCuisine = oldCuisine =>
  oldCuisine === "chinese" ? "asian" : oldCuisine;

const getIngredients = ingredients =>
  ingredients.map(i => {
    const ret = { name: i.ingredient_name };
    if (i.qty) {
      ret.qty = i.qty;
    }
    if (i.unit) {
      ret.unit = i.unit;
    }
    return ret;
  });

const migrated = oldRecipes.map(r => ({
  name: r.recipe_name,
  course: getCourse(r.course),
  cuisine: getCuisine(r.cuisine),
  servings: r.defaultServings,
  ingredients: getIngredients(r.ingredients),
  instructions: r.instructions ? r.instructions.split("\n") : [],
  sources: r.sources.map(s => s.description)
}));

Promise.all(
  migrated.map(r => axios.post("http://localhost:3001/api/recipes", r))
)
  .then(() => console.log("all succeeded"))
  .catch(reason => console.log(JSON.stringify(reason.response.data, null, 2)));
