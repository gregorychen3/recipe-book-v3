import React from "react";
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
  const renderByCourse = () => {
    return (
      <div className="container">
        {courseValues.map(course => {
          return (
            <>
              <div className="is-divider" data-content={course.toUpperCase()} />
              <ul>
                {recipes
                  .filter(recipe => recipe.course === course)
                  .map(recipe => (
                    <li>{recipe.name}</li>
                  ))}
              </ul>
            </>
          );
        })}
      </div>
    );
  };

  const renderByCuisine = () => {
    return (
      <div className="container">
        {cuisineValues.map(cuisine => {
          return (
            <>
              <div
                className="is-divider"
                data-content={cuisine.toUpperCase()}
              />
              <ul>
                {recipes
                  .filter(recipe => recipe.cuisine === cuisine)
                  .map(recipe => (
                    <li>{recipe.name}</li>
                  ))}
              </ul>
            </>
          );
        })}
      </div>
    );
  };

  return groupBy === "course" ? renderByCourse() : renderByCuisine();
};

export default RecipeList;
