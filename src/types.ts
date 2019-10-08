export type ICourse =
  | "antipasti"
  | "primi"
  | "secondi"
  | "dolci"
  | "contorni"
  | "sauces"
  | "beverages"
  | "other";

export type ICuisine =
  | "italian"
  | "anglophone"
  | "mediterranean"
  | "french"
  | "asian"
  | "other";

export interface IIngredient {
  qty: number;
  unit: string;
  servings: number;
}

export interface IRecipe {
  name: string;
  ingredients: IIngredient[];
  instructions: string[];
  course: ICourse;
  cuisine: ICuisine;
  sources: string[];
}
