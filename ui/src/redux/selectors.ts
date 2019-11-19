import { RootState } from "./reducers/index";

export const getRecipes = (state: RootState) => state.data.recipes;

export const getAdminLoginModalVisibility = (state: RootState) =>
  state.ui.adminLoginModalVisibility;

export const getAdminLoginCallback = (state: RootState) =>
  state.data.adminLoginCallback;
