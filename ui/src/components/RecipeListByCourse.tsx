import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";

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

interface Props {
  recipes: IRecipeModel[];
}
const RecipeListByCourse = ({ recipes }: Props) => (
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

export default RecipeListByCourse;
