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
    .custom(ingredient => {
      if (!ingredient.name) {
        throw new Error("Ingredient name missing");
      }
      if (typeof ingredient.name !== "string") {
        throw new Error("Ingredient name must be string");
      }
      if (ingredient.qty && typeof ingredient.qty !== "number") {
        throw new Error("Ingredient qty must be number");
      }
      if (ingredient.unit && typeof ingredient.unit !== "string") {
        throw new Error("Ingredient unit must be string");
      }
      if (ingredient.unit && !ingredient.qty) {
        throw new Error("Ingredient has unit but no qty");
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

recipeController.post(
  "/:id",
  recipeValidation,
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    if (!recipe) {
      return res.sendStatus(404);
    }

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

    recipe.name = name;
    recipe.course = course;
    recipe.cuisine = cuisine;
    recipe.servings = servings;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.sources = sources;

    const updatedRecipe = await recipe.save();

    return res.send(updatedRecipe);
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
