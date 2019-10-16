import axios, { AxiosPromise } from "axios";
import { IRecipeModel } from "../../src/db/recipe";
import { IRecipe } from "../../src/types";

//
// axios configuration
// -------------------
axios.defaults.headers.post["Content-Type"] = "application/json";
/*
axios.defaults.baseURL = "https://liquor-buddy-api.herokuapp.com";
axios.interceptors.request.use(async req => {
  // add jwt bearer header
  const currentUser = await firebase.auth().currentUser;
  if (currentUser) {
    const jwt = await currentUser.getIdToken(false);
    req.headers.common["Authorization"] = "Bearer " + jwt;
  }

  // log request
  const { method, url, data } = req;
  console.log(`${method!.toUpperCase()} ${url}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }

  return req;
});
axios.interceptors.response.use(async resp => {
  // log response
  const { status, statusText, config } = resp;
  console.log(`${status} (${config.method!.toUpperCase()} ${config.url})`);

  return resp;
});
*/

const apiClient = {
  fetchRecipes: (): AxiosPromise<IRecipeModel[]> => {
    const path = `/api/recipes`;
    return axios.get(path);
  },
  fetchRecipe: (recipeId: string): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes/${recipeId}`;
    return axios.get(path);
  },
  createRecipe: (recipe: IRecipe): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes`;
    return axios.post(path, recipe);
  },
  updateRecipe: (
    id: string,
    recipe: IRecipe,
    password: string
  ): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes/${id}`;
    return axios.post(path, recipe, { auth: { username: "admin", password } });
  },
  deleteRecipe: (
    recipeId: string,
    password: string
  ): AxiosPromise<{ _id: string }> => {
    const path = `/api/recipes/${recipeId}`;
    return axios.delete(path, { auth: { username: "admin", password } });
  }
};

export default apiClient;
