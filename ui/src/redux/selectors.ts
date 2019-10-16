import { RootState } from "./reducers/index";

export const recipes = (state: RootState) => state.data.recipes;

export const adminLoginModalVisibility = (state: RootState) =>
  state.ui.adminLoginModalVisibility;
