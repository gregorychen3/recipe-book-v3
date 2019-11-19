import queryString from "query-string";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import RecipeList from "../components/RecipeList";
import { ActionTypes, fetchRecipes } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { getRecipes } from "../redux/selectors";
import { IGroupBy, IGroupByValues } from "../types";

interface Props {
  fetchRecipes: typeof fetchRecipes;
}
const RecipesPage = ({ fetchRecipes }: Props) => {
  const recipes = useSelector(getRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  let location = useLocation();
  const parsed = queryString.parse(location.search);
  let groupBy: IGroupBy;
  if (typeof parsed.groupBy !== "string") {
    groupBy = "course";
  } else if (IGroupByValues.includes(parsed.groupBy)) {
    groupBy = parsed.groupBy as IGroupBy;
  } else {
    groupBy = "course";
  }

  return (
    <section className="section">
      <div className="container">
        <RecipeList recipes={recipes} groupBy={groupBy} />
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipes }, dispatch);
export default connect(null, mapDispatchToProps)(RecipesPage);
