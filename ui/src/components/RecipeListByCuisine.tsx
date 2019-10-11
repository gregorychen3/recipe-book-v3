import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";

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
}
const RecipeListByCuisine = ({ recipes }: Props) => (
  <div className="container">
    {cuisineValues.map(cuisine => {
      return (
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
      );
    })}
  </div>
);

export default RecipeListByCuisine;
