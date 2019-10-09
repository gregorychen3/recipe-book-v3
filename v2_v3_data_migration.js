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

const migrated = fullRecipes.map(r => ({
  name: r.recipe_name,
  course: getCourse(r.course),
  cuisine: getCuisine(r.cuisine)
}));
