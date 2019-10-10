import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
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

  return (
    <section className="section">
      <div className="container">
        <div className="is-divider" data-content="ANTIPASTI"></div>
        <div className="is-divider" data-content="PRIMI"></div>
        <div className="is-divider" data-content="SECONDI"></div>
        <div className="is-divider" data-content="DOLCI"></div>
        <div className="is-divider" data-content="CONTORNI"></div>
        <div className="is-divider" data-content="SAUCES"></div>
        <div className="is-divider" data-content="BEVERAGES"></div>
        <div className="is-divider" data-content="OTHER"></div>
      </div>
      {JSON.stringify(recipes)}
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
