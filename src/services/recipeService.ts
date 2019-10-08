import { Recipe } from "../db/recipe";
import l from "../logger";

const create = () => {
  l.info("Creating recipe");
  const recipe = new Recipe({});
  return recipe.save();
};

const list = async () => {
  l.info("Listing recipes");
  return await Recipe.find();
};

const update = () => {
  l.info("Updating recipe");
};

const remove = () => {
  l.info("Removing recipe");
};

export default { create, list, update, remove };
