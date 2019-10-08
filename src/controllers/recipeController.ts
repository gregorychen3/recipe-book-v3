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
      if (value.qty || value.unit || value.servings) {
        if (!value.qty || !value.unit || !value.servings) {
          throw new Error(
            "Ingredient must have qty unit and servings, or none of them"
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
recipeController.get("/", (req, res, next) => {
  res.send("respond with a resource");
});
recipeController.post("/", recipeValidation, (req: Request, res: Response) => {
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
  //await recipe.save()
  return res.send(recipe);
});
export default recipeController;
