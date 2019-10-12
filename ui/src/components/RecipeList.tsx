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
                <li>{recipe.name}</li>
              ))}
          </ul>
        </>
      ))}
    </>
  );

  return groupBy === "course" ? renderByCourse() : renderByCuisine();
};

export default RecipeList;
