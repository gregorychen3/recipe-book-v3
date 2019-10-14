import isUrl from "is-url";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { IIngredient } from "../../../src/types";
import apiClient from "../apiClient";
import { RecipeForm } from "../components/RecipeForm";
import { capitalize } from "../helpers";
import { ActionTypes, fetchRecipe } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";
import { IRecipe } from "../types";

const getIngredientDisplay = (i: IIngredient) => {
  let display = "";
  i.qty && (display += `${i.qty} `);
  i.unit && (display += `${i.unit} `);
  display += i.name;
  return display;
};

const getSourceDisplay = (s: string) =>
  isUrl(s) ? (
    <a href={s} target="_blank" rel="noopener noreferrer">
      {s}
    </a>
  ) : (
    s
  );

interface Props {
  edit: boolean;
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
}
const RecipePage = ({ recipes, fetchRecipe, edit }: Props) => {
  let history = useHistory();

  let { recipeId } = useParams();

  useEffect(() => {
    fetchRecipe(recipeId!);
  }, [fetchRecipe, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);
  if (!recipe) {
    return <div>not found</div>;
  }

  if (edit) {
    return (
      <RecipeForm
        recipe={recipe}
        onSubmit={(recipeId: string, recipe: IRecipe) => {
          apiClient.updateRecipe(recipeId, recipe);
          history.push(`/recipes/${recipeId}`);
        }}
      />
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          <a className="button is-white is-pulled-left is-invisible" href="#/">
            <span className="icon has-text-info is-small">
              <i className="fas fa-edit" />
            </span>
          </a>
          {recipe.name}
          <a
            onClick={() => history.push(`/recipes/${recipeId}/edit`)}
            className="button is-white is-pulled-right"
            href="#/"
          >
            <span className="icon has-text-info is-small">
              <i className="fas fa-edit" />
            </span>
          </a>
        </h1>

        <nav className="level">
          <p className="level-item has-text-centered" />
          <p className="level-item has-text-centered">
            <i className="fas fa-utensils" />
            <span style={{ paddingLeft: 5 }}>{capitalize(recipe.course)}</span>
          </p>
          <p className="level-item has-text-centered">
            <i className="fas fa-globe" />
            <span style={{ paddingLeft: 5 }}>{capitalize(recipe.cuisine)}</span>
          </p>
          <p className="level-item has-text-centered" />
        </nav>

        {recipe.ingredients.length > 0 && (
          <>
            <div className="is-divider" data-content="INGREDIENTS" />
            <div className="content">
              <ul>
                {recipe.ingredients.map(i => (
                  <li>{getIngredientDisplay(i)}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {recipe.instructions.length > 0 && (
          <>
            <div className="is-divider" data-content="INSTRUCTIONS" />
            <div className="content">
              <ol type="1">
                {recipe.instructions.map(i => (
                  <li>{i}</li>
                ))}
              </ol>
            </div>
          </>
        )}

        {recipe.sources.length > 0 && (
          <>
            <div className="is-divider" data-content="SOURCES" />
            <div className="content">
              <ul>
                {recipe.sources.map(s => (
                  <li>{getSourceDisplay(s)}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({ recipes: recipes(state) });
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipe }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
