import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { IIngredient } from "../../../src/types";
import { capitalize } from "../helpers";
import { ActionTypes, fetchRecipe } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";

const getIngredientDisplay = (i: IIngredient) => {
  let display = "";
  i.qty && (display += `${i.qty} `);
  i.unit && (display += `${i.unit} `);
  display += i.name;
  return display;
};

interface Props {
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
}
const RecipePage = ({ recipes, fetchRecipe }: Props) => {
  let { recipeId } = useParams();

  useEffect(() => {
    fetchRecipe(recipeId!);
  }, [fetchRecipe, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    return <div>not found</div>;
  }

  return (
    <div className="container">
      <h1 className="title has-text-centered">{recipe.name}</h1>

      <nav className="level">
        <p className="level-item has-text-centered" />
        <p className="level-item has-text-centered">
          <i className="fas fa-utensils" />
          <span style={{ paddingLeft: 5 }}>{capitalize(recipe.course)}</span>
        </p>
        <p className="level-item has-text-centered">
          <i className="fas fa-globe" />
          <span style={{ paddingLeft: 5 }}>{capitalize(recipe.cuisine)}</span>
        </p>
        <p className="level-item has-text-centered" />
      </nav>

      <div className="is-divider" data-content="INGREDIENTS" />
      <div className="content">
        <ul>
          {recipe.ingredients.map(i => (
            <li>{getIngredientDisplay(i)}</li>
          ))}
        </ul>
      </div>
      <div className="is-divider" data-content="INSTRUCTIONS" />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipe }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
