import queryString from "query-string";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import RecipeList from "../components/RecipeList";
import { ActionTypes, fetchRecipes } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";
import { IGroupBy } from "../types";

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
  let groupBy: IGroupBy;
  if (parsed.groupBy === "cuisine") {
    groupBy = "cuisine";
  } else groupBy = "course";

  return (
    <div className="container">
      <RecipeList recipes={recipes} groupBy={groupBy} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipes }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);
