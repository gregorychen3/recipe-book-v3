import React from "react";
import { Link } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { IGroupBy } from "../types";

const courseValues = [
  "antipasti",
  "primi",
  "secondi",
  "dolci",
  "contorni",
  "sauces",
  "beverages",
  "other"
];

const cuisineValues = [
  "italian",
  "anglophone",
  "mediterranean",
  "french",
  "asian",
  "other"
];

interface Props {
  recipes: IRecipeModel[];
  groupBy: IGroupBy;
}
const RecipeList = ({ recipes, groupBy }: Props) => {
  // recipes originating from redux store are already alphabetically sorted
  const renderAlphabetically = () => (
    <>
      <div className="is-divider" data-content="A-Z" />
      <ul>
        {recipes.map(recipe => (
          <li>
            <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );

  const renderByCourse = () => (
    <>
      {courseValues.map(course => (
        <>
          <div className="is-divider" data-content={course.toUpperCase()} />
          <ul>
            {recipes
              .filter(recipe => recipe.course === course)
              .map(recipe => (
                <li>
                  <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                </li>
              ))}
          </ul>
        </>
      ))}
    </>
  );

  const renderByCuisine = () => (
    <>
      {cuisineValues.map(cuisine => (
        <>
          <div className="is-divider" data-content={cuisine.toUpperCase()} />
          <ul>
            {recipes
              .filter(recipe => recipe.cuisine === cuisine)
              .map(recipe => (
                <li>
                  <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                </li>
              ))}
          </ul>
        </>
      ))}
    </>
  );

  switch (groupBy) {
    case "alphabetical":
      return renderAlphabetically();
    case "course":
      return renderByCourse();
    case "cuisine":
      return renderByCuisine();
  }
};

export default RecipeList;
