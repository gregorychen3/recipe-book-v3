import { IRecipeModel } from "../../../../src/db/recipe";
import { ActionTypes, FETCH_RECIPES_SUCCESS } from "../actions";

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
        recipes: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
