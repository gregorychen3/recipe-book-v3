import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Recipe } from "../db/recipe";
import { ICourseValues, ICuisineValues } from "../types";

const recipeValidation = [
  check("name")
    .exists()
    .isString(),
  check("course")
    .exists()
    .isIn(ICourseValues),
  check("cuisine")
    .exists()
    .isIn(ICuisineValues),
  check("servings")
    .exists()
    .isNumeric(),
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
            "If either qty or unit are present, both must be present"
          );
        }
        if (typeof value.qty !== "number") {
          throw new Error("Ingredient qty must be number");
        }
        if (typeof value.unit !== "string") {
          throw new Error("Ingredient unit must be string");
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
      course,
      cuisine,
      servings,
      ingredients,
      instructions,
      sources
    } = req.body;

    const recipe = new Recipe({
      name,
      course,
      cuisine,
      servings,
      ingredients,
      instructions,
      sources
    });
    const newRecipe = await recipe.save();
    return res.send(newRecipe);
  }
);

recipeController.delete("/:id", async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.params.id });
  if (!recipe) {
    return res.sendStatus(404);
  }

  const deleted = await recipe.remove();
  return res.send({ _id: deleted._id });
});

export default recipeController;
