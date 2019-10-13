import { Form, FormikProps, withFormik, Field } from "formik";
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
  const { values, touched, errors, isSubmitting } = props;
  return (
    <Form>
      <section className="section">
        <div className="container">
          <div className="field">
            <div className="control">
              <Field
                name="name"
                type="text"
                placeholder="Title"
                className="input is-large has-text-centered"
              />
            </div>
          </div>

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

          <div className="is-divider" data-content="INGREDIENTS" />
          <div className="content">
            <ul>
              {values.ingredients.map((ingredient, idx) => (
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

          <div className="is-divider" data-content="INSTRUCTIONS" />
          <div className="content">
            <ol type="1">
              {values.instructions.map((instruction, idx) => (
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

          <div className="is-divider" data-content="SOURCES" />
          <div className="content">
            <ul>
              {values.sources.map(s => (
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
          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <a className="button is-light">Cancel</a>
            </p>
            <p className="control">
              <button type="submit" className="button is-primary">
                <span className="icon">
                  <i className="fas fa-save"></i>
                </span>
                <span>Save</span>
              </button>
            </p>
          </div>
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

const getDefaultIngredient = (): IIngredient => ({ name: "" });

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
      ingredients: [...ingredients, getDefaultIngredient()],
      instructions: [...instructions, ""],
      sources: [...sources, ""]
    };
  },

  handleSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
  }
})(InnerForm);
