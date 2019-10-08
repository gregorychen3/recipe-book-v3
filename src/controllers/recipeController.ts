import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import { ICourseValues, ICuisineValues } from "../types";

const recipeValidation = [
  check("name").exists(),
  check("name").isString(),

  check("ingredients").exists(),
  check("ingredients").isArray(),

  check("instructions").exists(),
  check("instructions").isArray(),

  check("course").exists(),
  check("course").isIn(ICourseValues),

  check("cuisine").exists(),
  check("cuisine").isIn(ICuisineValues),

  check("sources").exists(),
  check("sources").isArray()
];

const recipeController = express.Router();

recipeController.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

recipeController.post("/", recipeValidation, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  return res.send("ok");
});

export default recipeController;
