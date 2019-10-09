import React, { Component } from "react";
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
class RecipesPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Hello World</h1>
          <p className="subtitle">
            My first website with <strong>Bulma</strong>!
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipes }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);
