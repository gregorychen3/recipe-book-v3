import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import client from "../apiClient";
import { RootState } from "./reducers";
import { IRecipeModel } from "../../../src/db/recipe";

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

export type ActionTypes =
  | FetchRecipesRequestAction
  | FetchRecipesSuccessAction
  | FetchRecipesFailureAction;

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

//
// THUNK ACTION CREATORS
// ---------------------
export const fetchRecipes = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async dispatch => {
  dispatch(fetchRecipesRequest());
  try {
    const response = await client.fetchRecipes();
    dispatch(fetchRecipesSuccess(response.data));
  } catch (e) {
    dispatch(fetchRecipesFailure());
    console.error(e);
  }
};
