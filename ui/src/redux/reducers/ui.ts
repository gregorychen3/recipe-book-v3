import { ActionTypes } from "../actions";

export type PriceSubmissionStatus = "succeeded" | "failed";

export interface UIState {
  //  logoutModalVisibility: boolean;
}

const initialState: UIState = {};

const uiReducer = (
  state: UIState = initialState,
  action: ActionTypes
): UIState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default uiReducer;
