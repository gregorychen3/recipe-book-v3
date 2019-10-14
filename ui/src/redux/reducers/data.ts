import { IRecipeModel } from "../../../../src/db/recipe";
import { compareByProp } from "../../helpers";
import {
  ActionTypes,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPE_SUCCESS,
  UPDATE_RECIPE_SUCCESS
} from "../actions";

export interface DataState {
  recipes: IRecipeModel[];
}

const initialState: DataState = { recipes: [] };

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

    default:
      return state;
  }
};

export default dataReducer;
