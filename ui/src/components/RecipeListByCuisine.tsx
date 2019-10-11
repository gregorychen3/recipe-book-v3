import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";

interface Props {
  recipes: IRecipeModel[];
}
const RecipeListByCuisine = ({ recipes }: Props) => {
  return (
    <div className="container">
      <div className="is-divider" data-content="ITALIAN"></div>
      <div className="is-divider" data-content="ANGLOPHONE"></div>
      <div className="is-divider" data-content="MEDITERRANEAN"></div>
      <div className="is-divider" data-content="FRENCH"></div>
      <div className="is-divider" data-content="ASIAN"></div>
      <div className="is-divider" data-content="OTHER"></div>
    </div>
  );
};

export default RecipeListByCuisine;
