import { Recipe } from "../db/recipe";

const create = () => {};

const list = async () => await Recipe.find();

const update = () => {};

const remove = () => {};

export default { create, list, update, remove };
