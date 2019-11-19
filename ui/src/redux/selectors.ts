import { RootState } from "./reducers/index";

export const getRecipes = (state: RootState) => state.data.recipes;

export const adminLoginModalVisibility = (state: RootState) =>
  state.ui.adminLoginModalVisibility;

export const adminLoginCallback = (state: RootState) =>
  state.data.adminLoginCallback;
