import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import RecipeList from "../components/RecipeList";
import { fetchRecipes } from "../redux/actions";
import { getRecipes } from "../redux/selectors";
import { IGroupBy, IGroupByValues } from "../types";

export default () => {
  const recipes = useSelector(getRecipes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

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
