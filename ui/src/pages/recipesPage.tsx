import queryString from "query-string";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import RecipeListByCourse from "../components/RecipeListByCourse";
import RecipeListByCuisine from "../components/RecipeListByCuisine";
import { ActionTypes, fetchRecipes } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";

interface Props {
  recipes: IRecipeModel[];
  fetchRecipes: typeof fetchRecipes;
}
const RecipesPage = ({ recipes, fetchRecipes }: Props) => {
  useEffect(() => {
    fetchRecipes();
  }, []);

  let location = useLocation();
  const parsed = queryString.parse(location.search);
  const groupBy = parsed.groupBy ? parsed.groupBy : "course";

  return (
    <section className="section">
      {groupBy == "course" && <RecipeListByCourse recipes={recipes} />}
      {groupBy == "cuisine" && <RecipeListByCuisine recipes={recipes} />}
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipes }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);
