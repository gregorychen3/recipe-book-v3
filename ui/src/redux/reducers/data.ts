import { IRecipeModel } from "../../../../src/db/recipe";
import { ActionTypes } from "../actions";

export interface DataState {
  recipes: IRecipeModel[];
}

const initialState: DataState = { recipes: [] };

const dataReducer = (
  state: DataState = initialState,
  action: ActionTypes
): DataState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default dataReducer;
