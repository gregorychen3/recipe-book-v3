import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { ActionTypes, fetchRecipe } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";

interface Props {
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
}
const RecipePage = ({ recipes, fetchRecipe }: Props) => {
  let { recipeId } = useParams();

  useEffect(() => {
    fetchRecipe(recipeId!);
  }, [fetchRecipe, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    return <div>not found</div>;
  }

  return (
    <div className="container">
      <h1 className="title">{recipe.name}</h1>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipe }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
