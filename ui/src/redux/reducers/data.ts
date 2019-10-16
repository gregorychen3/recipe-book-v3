import { IRecipeModel } from "../../../../src/db/recipe";
import { compareByProp } from "../../helpers";
import {
  ActionTypes,
  CREATE_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS,
  SET_ADMIN_LOGIN_CALLBACK
} from "../actions";

export interface DataState {
  recipes: IRecipeModel[];
  adminLoginCallback: (() => void) | undefined;
}

const initialState: DataState = { recipes: [], adminLoginCallback: undefined };

const dataReducer = (
  state: DataState = initialState,
  action: ActionTypes
): DataState => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload.sort(compareByProp("name"))
      };
    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(r => r._id !== action.payload._id),
          action.payload
        ].sort(compareByProp("name"))
      };
    case UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(r => r._id !== action.payload._id),
          action.payload
        ].sort(compareByProp("name"))
      };
    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter(r => r._id !== action.payload._id),
          action.payload
        ].sort(compareByProp("name"))
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.filter(r => r._id !== action.payload)
      };
    case SET_ADMIN_LOGIN_CALLBACK:
      return {
        ...state,
        adminLoginCallback: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
