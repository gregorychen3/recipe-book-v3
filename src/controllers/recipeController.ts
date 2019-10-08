import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";

const recipeValidation = [check("name").exists(), check("name").isString()];

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
