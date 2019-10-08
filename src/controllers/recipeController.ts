import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { ICourseValues, ICuisineValues } from "../types";
import { Recipe } from "../db/recipe";

const recipeValidation = [
  check("name")
    .exists()
    .isString(),
  check("ingredients")
    .exists()
    .isArray(),
  check("ingredients.*")
    .exists()
    .custom(value => {
      if (!value.name) {
        throw new Error("Ingredient name missing");
      }
      if (value.qty || value.unit) {
        if (!value.qty || !value.unit) {
          throw new Error(
            "If any of qty or unit are present, both must be present"
          );
        }
      }
      return true;
    }),
  check("instructions")
    .exists()
    .isArray(),
  check("instructions.*")
    .exists({ checkFalsy: true })
    .isString(),
  check("course")
    .exists()
    .isIn(ICourseValues),
  check("cuisine")
    .exists()
    .isIn(ICuisineValues),
  check("sources")
    .exists()
    .isArray(),
  check("sources.*")
    .exists({ checkFalsy: true })
    .isString()
];

const recipeController = express.Router();

recipeController.get("/", async (req, res, next) => {
  const recipes = await Recipe.find();
  return res.json(recipes);
});

recipeController.post(
  "/",
  recipeValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ errors: errors.array({ onlyFirstError: true }) });
    }

    const {
      name,
      ingredients,
      instructions,
      course,
      cuisine,
      sources
    } = req.body;

    const recipe = new Recipe({
      name,
      ingredients,
      instructions,
      course,
      cuisine,
      sources
    });
    const newRecipe = await recipe.save();
    return res.send(newRecipe);
  }
);

export default recipeController;
