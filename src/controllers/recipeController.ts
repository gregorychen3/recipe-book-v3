import express from "express";

const recipeController = express.Router();

recipeController.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

export default recipeController;
