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
  servings: number;
  ingredients: IIngredient[];
  instructions: string[];
  course: ICourse;
  cuisine: ICuisine;
  sources: string[];
}
