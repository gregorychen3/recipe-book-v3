import { Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import client from "../apiClient";
import { IRecipe } from "../types";
import { history } from "../App";

//
// SYNC ACTION TYPES
// -----------------
export const SHOW_ADMIN_LOGIN_MODAL = "SHOW_ADMIN_LOGIN_MODAL";
interface ShowAdminLoginModalAction {
  type: typeof SHOW_ADMIN_LOGIN_MODAL;
}
export const HIDE_ADMIN_LOGIN_MODAL = "HIDE_ADMIN_LOGIN_MODAL";
interface HideAdminLoginModalAction {
  type: typeof HIDE_ADMIN_LOGIN_MODAL;
}
export const SET_ADMIN_LOGIN_CALLBACK = "SET_ADMIN_LOGIN_CALLBACK";
interface SetAdminLoginCallbackAction {
  type: typeof SET_ADMIN_LOGIN_CALLBACK;
  payload: () => void;
}

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

export const UPDATE_RECIPE_REQUEST = "UPDATE_RECIPE_REQUEST";
interface UpdateRecipeRequestAction {
  type: typeof UPDATE_RECIPE_REQUEST;
  payload: { recipeId: string; recipe: IRecipe };
}
export const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
interface UpdateRecipeSuccessAction {
  type: typeof UPDATE_RECIPE_SUCCESS;
  payload: IRecipeModel;
}
export const UPDATE_RECIPE_FAILURE = "UPDATE_RECIPE_FAILURE";
interface UpdateRecipeFailureAction {
  type: typeof UPDATE_RECIPE_FAILURE;
}

export const CREATE_RECIPE_REQUEST = "CREATE_RECIPE_REQUEST";
interface CreateRecipeRequestAction {
  type: typeof CREATE_RECIPE_REQUEST;
  payload: IRecipe;
}
export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";
interface CreateRecipeSuccessAction {
  type: typeof CREATE_RECIPE_SUCCESS;
  payload: IRecipeModel;
}
export const CREATE_RECIPE_FAILURE = "CREATE_RECIPE_FAILURE";
interface CreateRecipeFailureAction {
  type: typeof CREATE_RECIPE_FAILURE;
}

export const DELETE_RECIPE_REQUEST = "DELETE_RECIPE_REQUEST";
interface DeleteRecipeRequestAction {
  type: typeof DELETE_RECIPE_REQUEST;
  payload: string;
}
export const DELETE_RECIPE_SUCCESS = "DELETE_RECIPE_SUCCESS";
interface DeleteRecipeSuccessAction {
  type: typeof DELETE_RECIPE_SUCCESS;
  payload: string;
}
export const DELETE_RECIPE_FAILURE = "DELETE_RECIPE_FAILURE";
interface DeleteRecipeFailureAction {
  type: typeof DELETE_RECIPE_FAILURE;
}

export type ActionTypes =
  | FetchRecipesRequestAction
  | FetchRecipesSuccessAction
  | FetchRecipesFailureAction
  | FetchRecipeRequestAction
  | FetchRecipeSuccessAction
  | FetchRecipeFailureAction
  | UpdateRecipeRequestAction
  | UpdateRecipeSuccessAction
  | UpdateRecipeFailureAction
  | CreateRecipeRequestAction
  | CreateRecipeSuccessAction
  | CreateRecipeFailureAction
  | DeleteRecipeRequestAction
  | DeleteRecipeSuccessAction
  | DeleteRecipeFailureAction
  | ShowAdminLoginModalAction
  | HideAdminLoginModalAction
  | SetAdminLoginCallbackAction;

//
// SYNC ACTION CREATORS
// --------------------
export const showAdminLoginModal = (): ActionTypes => ({
  type: SHOW_ADMIN_LOGIN_MODAL
});
export const hideAdminLoginModal = (): ActionTypes => ({
  type: HIDE_ADMIN_LOGIN_MODAL
});
export const setAdminLoginCallback = (callback: () => void): ActionTypes => ({
  type: SET_ADMIN_LOGIN_CALLBACK,
  payload: callback
});

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

export const updateRecipeRequest = (
  recipeId: string,
  recipe: IRecipe
): ActionTypes => ({
  type: UPDATE_RECIPE_REQUEST,
  payload: { recipeId, recipe }
});
export const updateRecipeSuccess = (recipe: IRecipeModel): ActionTypes => ({
  type: UPDATE_RECIPE_SUCCESS,
  payload: recipe
});
export const updateRecipeFailure = (): ActionTypes => ({
  type: UPDATE_RECIPE_FAILURE
});

export const createRecipeRequest = (recipe: IRecipe): ActionTypes => ({
  type: CREATE_RECIPE_REQUEST,
  payload: recipe
});
export const createRecipeSuccess = (recipe: IRecipeModel): ActionTypes => ({
  type: CREATE_RECIPE_SUCCESS,
  payload: recipe
});
export const createRecipeFailure = (): ActionTypes => ({
  type: CREATE_RECIPE_FAILURE
});

export const deleteRecipeRequest = (recipeId: string): ActionTypes => ({
  type: DELETE_RECIPE_REQUEST,
  payload: recipeId
});
export const deleteRecipeSuccess = (recipeId: string): ActionTypes => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: recipeId
});
export const deleteRecipeFailure = (): ActionTypes => ({
  type: DELETE_RECIPE_FAILURE
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

export const updateRecipe = (recipeId: string, recipe: IRecipe) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(updateRecipeRequest(recipeId, recipe));
  try {
    const response = await client.updateRecipe(recipeId, recipe);
    dispatch(updateRecipeSuccess(response.data));
    history.push(`/recipes/${recipeId}`);
  } catch (e) {
    dispatch(updateRecipeFailure());
    console.error(e);
  }
};

export const createRecipe = (recipe: IRecipe) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(createRecipeRequest(recipe));
  try {
    const response = await client.createRecipe(recipe);
    dispatch(createRecipeSuccess(response.data));
    history.push(`/recipes/${response.data._id}/edit`);
  } catch (e) {
    dispatch(createRecipeFailure());
    console.error(e);
  }
};

export const deleteRecipe = (recipeId: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(deleteRecipeRequest(recipeId));
  try {
    const response = await client.deleteRecipe(recipeId);
    dispatch(deleteRecipeSuccess(response.data._id));
    history.push(`/recipes`);
  } catch (e) {
    dispatch(deleteRecipeFailure());
    console.error(e);
  }
};
