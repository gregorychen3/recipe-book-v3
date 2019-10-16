import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { RecipeForm } from "../components/RecipeForm";
import {
  ActionTypes,
  deleteRecipe,
  fetchRecipe,
  hideAdminLoginModal,
  setAdminLoginCallback,
  showAdminLoginModal,
  updateRecipe
} from "../redux/actions";
import { RootState } from "../redux/reducers";
import { adminLoginModalVisibility, recipes } from "../redux/selectors";
import { IRecipe } from "../types";

interface Props {
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
  updateRecipe: typeof updateRecipe;
  deleteRecipe: typeof deleteRecipe;
  adminLoginModalVisibility: boolean;
  showAdminLoginModal: typeof showAdminLoginModal;
  hideAdminLoginModal: typeof hideAdminLoginModal;
  setAdminLoginCallback: typeof setAdminLoginCallback;
}
const EditRecipePage = ({
  recipes,
  fetchRecipe,
  updateRecipe,
  deleteRecipe,
  adminLoginModalVisibility,
  showAdminLoginModal,
  hideAdminLoginModal,
  setAdminLoginCallback
}: Props) => {
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
      onSubmit={(recipeId: string, recipe: IRecipe) => (password: string) =>
        updateRecipe(recipeId, recipe, password)}
      onDelete={(recipeId: string) => (password: string) =>
        deleteRecipe(recipeId, password)}
      onCancel={(recipeId: string) => history.push(`/recipes/${recipeId}`)}
      adminLoginModalVisibility={adminLoginModalVisibility}
      showAdminLoginModal={showAdminLoginModal}
      hideAdminLoginModal={hideAdminLoginModal}
      setAdminLoginCallback={setAdminLoginCallback}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  recipes: recipes(state),
  adminLoginModalVisibility: adminLoginModalVisibility(state)
});
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators(
    {
      fetchRecipe,
      updateRecipe,
      deleteRecipe,
      showAdminLoginModal,
      hideAdminLoginModal,
      setAdminLoginCallback
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipePage);
