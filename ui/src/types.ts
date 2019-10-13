export type IGroupBy = "course" | "cuisine" | "alphabetical";
export const IGroupByValues = ["course", "cuisine", "alphabetical"];

// keep in sync with types.ts in api
export type ICourse =
  | "antipasti"
  | "primi"
  | "secondi"
  | "dolci"
  | "contorni"
  | "sauces"
  | "beverages"
  | "other";
export const ICourseValues = [
  "antipasti",
  "primi",
  "secondi",
  "dolci",
  "contorni",
  "sauces",
  "beverages",
  "other"
];

export type ICuisine =
  | "italian"
  | "anglophone"
  | "mediterranean"
  | "french"
  | "asian"
  | "other";
export const ICuisineValues = [
  "italian",
  "anglophone",
  "mediterranean",
  "french",
  "asian",
  "other"
];

export interface IIngredient {
  name: string;
  qty?: number;
  unit?: string;
}

export interface IRecipe {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IIngredient[];
  instructions: string[];
  sources: string[];
}
