import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
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
import { getAdminLoginModalVisibility, getRecipes } from "../redux/selectors";
import { IRecipe } from "../types";

interface Props {
  fetchRecipe: typeof fetchRecipe;
  updateRecipe: typeof updateRecipe;
  deleteRecipe: typeof deleteRecipe;
  showAdminLoginModal: typeof showAdminLoginModal;
  hideAdminLoginModal: typeof hideAdminLoginModal;
  setAdminLoginCallback: typeof setAdminLoginCallback;
}
const EditRecipePage = ({
  fetchRecipe,
  updateRecipe,
  deleteRecipe,
  showAdminLoginModal,
  hideAdminLoginModal,
  setAdminLoginCallback
}: Props) => {
  let history = useHistory();
  const adminLoginModalVisibility = useSelector(getAdminLoginModalVisibility);
  const recipes = useSelector(getRecipes);
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
export default connect(null, mapDispatchToProps)(EditRecipePage);
