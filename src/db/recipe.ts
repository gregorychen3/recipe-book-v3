import { Document, Model, model, Schema } from "mongoose";
import { IRecipe } from "../types";

export interface IRecipeModel extends IRecipe, Document {}

export const RecipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: false },
        unit: { type: String, required: false },
        servings: { type: Number, required: false }
      }
    ],
    required: true
  },
  instructions: { type: [String], required: true },
  course: {
    type: String,
    required: true,
    enum: [
      "antipasti",
      "primi",
      "secondi",
      "dolci",
      "contorni",
      "sauces",
      "beverages",
      "other"
    ]
  },
  cuisine: {
    type: String,
    required: true,
    enum: ["italian", "anglophone", "mediterranean", "french", "asian", "other"]
  },
  sources: { type: [String], required: true }
});

export const Recipe: Model<IRecipeModel> = model<IRecipeModel>(
  "Recipe",
  RecipeSchema
);
