import { IRecipe } from "./types";

export const capitalize = (s: string) =>
  s === "" ? s : `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

export const compareByProp = (prop: string) => (a: any, b: any) =>
  a[prop] > b[prop] ? 1 : -1;

export const defaultRecipe = (): IRecipe => ({
  name: "New Recipe",
  course: "primi",
  cuisine: "italian",
  servings: 1,
  ingredients: [],
  instructions: [],
  sources: []
});
