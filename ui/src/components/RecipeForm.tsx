import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";
import { capitalize } from "../helpers";
import {
  ICourse,
  ICourseValues,
  ICuisine,
  ICuisineValues,
  IIngredient
} from "../types";

// Shape of form values
interface FormValues {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IIngredient[];
  instructions: string[];
  sources: string[];
}

interface OtherProps {
  recipe: IRecipeModel;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">
            <a className="button is-white is-pulled-left is-invisible">
              <span className="icon has-text-info is-small">
                <i className="fas fa-edit" />
              </span>
            </a>
            {props.values.name}
            <button type="submit" className="button is-white is-pulled-right">
              <span className="icon has-text-info is-small">
                <i className="fas fa-save" />
              </span>
            </button>
          </h1>

          <nav className="level">
            <p className="level-item has-text-centered" />
            <div className="level-item has-text-centered">
              <div className="field">
                <div className="control has-icons-left">
                  <div className="select">
                    <select>
                      {ICourseValues.map(c => (
                        <option value={c} label={capitalize(c)} key={c} />
                      ))}
                    </select>
                  </div>
                  <div className="icon is-small is-left">
                    <i className="fas fa-utensils"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div className="field">
                <div className="control has-icons-left">
                  <div className="select">
                    <select>
                      {ICuisineValues.map(c => (
                        <option value={c} label={capitalize(c)} key={c} />
                      ))}
                    </select>
                  </div>
                  <div className="icon is-small is-left">
                    <i className="fas fa-globe"></i>
                  </div>
                </div>
              </div>
            </div>
            <p className="level-item has-text-centered" />
          </nav>

          {props.recipe.ingredients.length > 0 && (
            <>
              <div className="is-divider" data-content="INGREDIENTS" />
              <div className="content">
                <ul>
                  {props.recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      <div className="field is-horizontal">
                        <div className="field-body">
                          <div className="field">
                            <p className="control is-expanded">
                              <input
                                className="input"
                                type="number"
                                placeholder="Quantity"
                                value={ingredient.qty}
                              />
                            </p>
                          </div>
                          <div className="field">
                            <p className="control is-expanded">
                              <input
                                className="input"
                                type="text"
                                placeholder="Unit"
                                value={ingredient.unit}
                              />
                            </p>
                          </div>
                          <div className="field">
                            <p className="control is-expanded">
                              <input
                                className="input"
                                type="text"
                                placeholder="Name"
                                value={ingredient.name}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {props.recipe.instructions.length > 0 && (
            <>
              <div className="is-divider" data-content="INSTRUCTIONS" />
              <div className="content">
                <ol type="1">
                  {props.recipe.instructions.map((instruction, idx) => (
                    <li key={idx}>
                      <input
                        className="input"
                        type="text"
                        value={instruction}
                        placeholder="Each step on its own line"
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {props.recipe.sources.length > 0 && (
            <>
              <div className="is-divider" data-content="SOURCES" />
              <div className="content">
                <ul>
                  {props.recipe.sources.map(s => (
                    <li key={s}>
                      <input
                        className="input"
                        type="text"
                        value={s}
                        placeholder="Enter source"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </Form>
  );

  /*
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );*/
};

// The type of props MyForm receives
interface MyFormProps {
  recipe: IRecipeModel; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the using withFormik HoC
export const RecipeForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    const {
      name,
      course,
      cuisine,
      servings,
      ingredients,
      instructions,
      sources
    } = props.recipe;
    return {
      name,
      course,
      cuisine,
      servings,
      ingredients,
      instructions,
      sources
    };
  },

  handleSubmit: values => {
    console.log("submitted");
    // do submitting things
  }
})(InnerForm);
