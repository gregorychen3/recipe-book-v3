import isUrl from "is-url";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import { IRecipeModel } from "../../../src/db/recipe";
import { IIngredient } from "../../../src/types";
import { capitalize } from "../helpers";
import { ActionTypes, fetchRecipe, updateRecipe } from "../redux/actions";
import { RootState } from "../redux/reducers";
import { recipes } from "../redux/selectors";

const getIngredientDisplay = (i: IIngredient, scalingFactor: number) => {
  let display = "";
  i.qty && (display += `${(i.qty * scalingFactor).toFixed(2)} `);
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
  recipes: IRecipeModel[];
  fetchRecipe: typeof fetchRecipe;
}
const RecipePage = ({ recipes, fetchRecipe }: Props) => {
  let history = useHistory();

  let { recipeId } = useParams();

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    fetchRecipe(recipeId);
  }, [fetchRecipe, recipeId]);

  const recipe = recipes.find(r => r._id === recipeId);

  const [servingsState, setServingsState] = useState(1);
  useEffect(() => {
    if (!recipe) {
      return;
    }
    setServingsState(recipe.servings);
  }, [recipe]);

  if (!recipe) {
    return null;
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
            onClick={() => {
              history.push(`/recipes/${recipeId}/edit`);
            }}
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
            <div className="columns">
              <div className="column is-one-fifth">
                <div className="field has-addons">
                  <p className="control">
                    <input
                      type="number"
                      value={servingsState}
                      onChange={e =>
                        setServingsState(parseFloat(e.target.value))
                      }
                      placeholder="Servings"
                      className="input is-small"
                    />
                  </p>
                  <p className="control">
                    <a className="button is-static is-small" href="#/">
                      Servings
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="content">
              <ul>
                {recipe.ingredients.map((i, idx) => (
                  <li key={idx}>
                    {getIngredientDisplay(i, servingsState / recipe.servings)}
                  </li>
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
                {recipe.instructions.map((i, idx) => (
                  <li key={idx}>{i}</li>
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
                {recipe.sources.map((s, idx) => (
                  <li key={idx}>{getSourceDisplay(s)}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({
  recipes: recipes(state)
});
const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ fetchRecipe }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipePage);
