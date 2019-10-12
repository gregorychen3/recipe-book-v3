import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { ActionTypes, fetchRecipes } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";

interface Props {
  recipes: IRecipeModel[];
  fetchRecipes: typeof fetchRecipes;
}
const RecipePage = ({ recipes, fetchRecipes }: Props) => {
  let { recipeId } = useParams();

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="title">{recipe.name}</h1>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipes }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
