import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { RecipeForm } from "../components/RecipeForm";
import { ActionTypes, fetchRecipe, updateRecipe } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";
import { IRecipe } from "../types";

interface Props {
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
  updateRecipe: typeof updateRecipe;
}
const EditRecipePage = ({ recipes, fetchRecipe, updateRecipe }: Props) => {
  let history = useHistory();

  let { recipeId } = useParams();

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    fetchRecipe(recipeId);
  }, [fetchRecipe, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    history.push("/recipes");
    return null;
  }

  return (
    <RecipeForm
      recipe={recipe}
      onSubmit={(recipeId: string, recipe: IRecipe) => {
        updateRecipe(recipeId, recipe);
        history.push(`/recipes/${recipeId}`);
      }}
    />
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipe, updateRecipe }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipePage);