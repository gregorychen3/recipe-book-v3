import {
  ActionTypes,
  FETCH_RECIPES_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  HIDE_ADMIN_LOGIN_MODAL,
  SHOW_ADMIN_LOGIN_MODAL
} from "../actions";

export type PriceSubmissionStatus = "succeeded" | "failed";

export interface UIState {
  isFetchingRecipes: boolean;
  adminLoginModalVisibility: boolean;
}

const initialState: UIState = {
  isFetchingRecipes: false,
  adminLoginModalVisibility: false
};

const uiReducer = (
  state: UIState = initialState,
  action: ActionTypes
): UIState => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return { ...state, isFetchingRecipes: true };
    case FETCH_RECIPES_SUCCESS:
      return { ...state, isFetchingRecipes: false };
    case FETCH_RECIPES_FAILURE:
      return { ...state, isFetchingRecipes: false };
    case SHOW_ADMIN_LOGIN_MODAL:
      return { ...state, adminLoginModalVisibility: true };
    case HIDE_ADMIN_LOGIN_MODAL:
      return { ...state, adminLoginModalVisibility: false };
    default:
      return state;
  }
};

export default uiReducer;
