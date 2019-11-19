import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RecipeForm } from "../components/RecipeForm";
import {
  deleteRecipe,
  fetchRecipe,
  hideAdminLoginModal,
  setAdminLoginCallback,
  showAdminLoginModal,
  updateRecipe
} from "../redux/actions";
import { getAdminLoginModalVisibility, getRecipes } from "../redux/selectors";
import { IRecipe } from "../types";

export default () => {
  let history = useHistory();
  const adminLoginModalVisibility = useSelector(getAdminLoginModalVisibility);
  const recipes = useSelector(getRecipes);
  let { recipeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    dispatch(fetchRecipe(recipeId));
  }, [dispatch, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    history.push("/recipes");
    return null;
  }

  return (
    <RecipeForm
      recipe={recipe}
      onSubmit={(recipeId: string, recipe: IRecipe) => (password: string) =>
        dispatch(updateRecipe(recipeId, recipe, password))}
      onDelete={(recipeId: string) => (password: string) =>
        dispatch(deleteRecipe(recipeId, password))}
      onCancel={(recipeId: string) => history.push(`/recipes/${recipeId}`)}
      adminLoginModalVisibility={adminLoginModalVisibility}
      showAdminLoginModal={() => dispatch(showAdminLoginModal())}
      hideAdminLoginModal={() => dispatch(hideAdminLoginModal())}
      setAdminLoginCallback={(callback: (password: string) => void) =>
        dispatch(setAdminLoginCallback(callback))
      }
    />
  );
};
