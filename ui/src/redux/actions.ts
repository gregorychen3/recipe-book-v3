import { Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import client from "../apiClient";

//
// SYNC ACTION TYPES
// -----------------
/*
export const LOG_USER_IN = "LOG_USER_IN";
interface LogUserInAction {
  type: typeof LOG_USER_IN;
  payload: firebase.User;
}
*/

//
// ASYNC ACTION TYPES
// ------------------
export const FETCH_RECIPES_REQUEST = "FETCH_RECIPES_REQUEST";
interface FetchRecipesRequestAction {
  type: typeof FETCH_RECIPES_REQUEST;
}
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
interface FetchRecipesSuccessAction {
  type: typeof FETCH_RECIPES_SUCCESS;
  payload: IRecipeModel[];
}
export const FETCH_RECIPES_FAILURE = "FETCH_RECIPES_FAILURE";
interface FetchRecipesFailureAction {
  type: typeof FETCH_RECIPES_FAILURE;
}

export const FETCH_RECIPE_REQUEST = "FETCH_RECIPE_REQUEST";
interface FetchRecipeRequestAction {
  type: typeof FETCH_RECIPE_REQUEST;
}
export const FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS";
interface FetchRecipeSuccessAction {
  type: typeof FETCH_RECIPE_SUCCESS;
  payload: IRecipeModel;
}
export const FETCH_RECIPE_FAILURE = "FETCH_RECIPE_FAILURE";
interface FetchRecipeFailureAction {
  type: typeof FETCH_RECIPE_FAILURE;
}

export type ActionTypes =
  | FetchRecipesRequestAction
  | FetchRecipesSuccessAction
  | FetchRecipesFailureAction
  | FetchRecipeRequestAction
  | FetchRecipeSuccessAction
  | FetchRecipeFailureAction;

//
// SYNC ACTION CREATORS
// --------------------
/*
export const logUserIn = (user: firebase.User): ActionTypes => ({
  type: LOG_USER_IN,
  payload: user
});
*/

//
// ASYNC ACTION CREATORS
// ---------------------
export const fetchRecipesRequest = (): ActionTypes => ({
  type: FETCH_RECIPES_REQUEST
});
export const fetchRecipesSuccess = (recipes: IRecipeModel[]): ActionTypes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});
export const fetchRecipesFailure = (): ActionTypes => ({
  type: FETCH_RECIPES_FAILURE
});

export const fetchRecipeRequest = (): ActionTypes => ({
  type: FETCH_RECIPE_REQUEST
});
export const fetchRecipeSuccess = (recipe: IRecipeModel): ActionTypes => ({
  type: FETCH_RECIPE_SUCCESS,
  payload: recipe
});
export const fetchRecipeFailure = (): ActionTypes => ({
  type: FETCH_RECIPE_FAILURE
});

//
// THUNK ACTION CREATORS
// ---------------------
export const fetchRecipes = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(fetchRecipesRequest());
  try {
    const response = await client.fetchRecipes();
    dispatch(fetchRecipesSuccess(response.data));
  } catch (e) {
    dispatch(fetchRecipesFailure());
    console.error(e);
  }
};

export const fetchRecipe = (recipeId: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(fetchRecipeRequest());
  try {
    const response = await client.fetchRecipe(recipeId);
    dispatch(fetchRecipeSuccess(response.data));
  } catch (e) {
    dispatch(fetchRecipeFailure());
    console.error(e);
  }
};
