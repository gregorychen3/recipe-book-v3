import {
  ActionTypes,
  HIDE_ADMIN_LOGIN_MODAL,
  SHOW_ADMIN_LOGIN_MODAL
} from "../actions";

export type PriceSubmissionStatus = "succeeded" | "failed";

export interface UIState {
  adminLoginModalVisibility: boolean;
}

const initialState: UIState = { adminLoginModalVisibility: false };

const uiReducer = (
  state: UIState = initialState,
  action: ActionTypes
): UIState => {
  switch (action.type) {
    case SHOW_ADMIN_LOGIN_MODAL:
      return { ...state, adminLoginModalVisibility: true };
    case HIDE_ADMIN_LOGIN_MODAL:
      return { ...state, adminLoginModalVisibility: false };
    default:
      return state;
  }
};

export default uiReducer;
