import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";

interface Props {
  recipes: IRecipeModel[];
}
const RecipeListByCourse = ({ recipes }: Props) => {
  return (
    <div className="container">
      <div className="is-divider" data-content="ANTIPASTI"></div>
      <div className="is-divider" data-content="PRIMI"></div>
      <div className="is-divider" data-content="SECONDI"></div>
      <div className="is-divider" data-content="DOLCI"></div>
      <div className="is-divider" data-content="CONTORNI"></div>
      <div className="is-divider" data-content="SAUCES"></div>
      <div className="is-divider" data-content="BEVERAGES"></div>
      <div className="is-divider" data-content="OTHER"></div>
    </div>
  );
};

export default RecipeListByCourse;
