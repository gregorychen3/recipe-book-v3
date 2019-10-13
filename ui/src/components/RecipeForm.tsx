import { Field, FieldArray, Form, FormikProps, withFormik } from "formik";
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
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    dirty,
    setFieldValue
  } = props;
  return (
    <Form>
      <section className="section">
        <div className="container">
          <div className="field">
            <label className="label">Recipe Name</label>
            <div className="control">
              <Field
                name="name"
                type="text"
                placeholder="Title"
                className="input"
              />
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Servings</label>
                <div className="control">
                  <Field
                    name="servings"
                    type="number"
                    placeholder="Must be > 0"
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">Course</label>
                <div className="control is-expanded has-icons-left">
                  <div className="select is-fullwidth">
                    <select
                      name="course"
                      value={values.course}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
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

            <div className="column">
              <div className="field">
                <label className="label">Cuisine</label>
                <div className="control is-expanded has-icons-left">
                  <div className="select is-fullwidth">
                    <select
                      name="cuisine"
                      value={values.cuisine}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
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
          </div>

          <div className="is-divider" data-content="INGREDIENTS" />
          <div className="content">
            <FieldArray
              name="ingredients"
              render={ingredientsHelpers =>
                values.ingredients.map((ingredient, idx) => (
                  <div className="columns">
                    <div className="column is-one-quarter">
                      <div className="field">
                        <p className="control is-expanded">
                          <Field
                            name={`ingredients.${idx}.qty`}
                            type="number"
                            placeholder="Quantity"
                            className="input"
                          />
                        </p>
                      </div>
                    </div>
                    <div className="column is-one-quarter">
                      <div className="field">
                        <p className="control is-expanded">
                          <Field
                            name={`ingredients.${idx}.unit`}
                            type="text"
                            placeholder="Unit"
                            className="input"
                          />
                        </p>
                      </div>
                    </div>
                    <div className="column is-half">
                      <div className="field">
                        <p className="control is-expanded">
                          <Field
                            name={`ingredients.${idx}.name`}
                            type="text"
                            placeholder="Name"
                            className="input"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
            />
          </div>

          <div className="is-divider" data-content="INSTRUCTIONS" />
          <div className="content">
            <FieldArray
              name="instructions"
              render={instructionsHelpers =>
                values.instructions.map((instruction, idx, instructions) => (
                  <div className="field">
                    <div className="control">
                      <Field
                        name={`instructions.${idx}`}
                        type="text"
                        placeholder="Each step on its own line"
                        className="input"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setFieldValue(
                            `instructions.${idx}`,
                            e.currentTarget.value
                          );
                          if (idx === instructions.length - 1) {
                            instructionsHelpers.push("");
                          }
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            />
          </div>

          <div className="is-divider" data-content="SOURCES" />
          <div className="content">
            <FieldArray
              name="sources"
              render={sourcesHelpers =>
                values.sources.map((source, idx, sources) => (
                  <div className="field">
                    <div className="control">
                      <Field
                        name={`sources.${idx}`}
                        type="text"
                        placeholder="Enter source"
                        className="input"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setFieldValue(
                            `sources.${idx}`,
                            e.currentTarget.value
                          );
                          if (idx === sources.length - 1) {
                            sourcesHelpers.push("");
                          }
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            />
          </div>

          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <a className="button is-light">Cancel</a>
            </p>
            <p className="control">
              <button
                type="submit"
                disabled={!dirty}
                className="button is-primary"
              >
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
