import { Field, FieldArray, Form, FormikProps, withFormik } from "formik";
import React from "react";
import classNames from "classnames";
import * as yup from "yup";
import { IRecipeModel } from "../../../src/db/recipe";
import { capitalize } from "../helpers";
import {
  ICourse,
  ICourseValues,
  ICuisine,
  ICuisineValues,
  IIngredient,
  IRecipe
} from "../types";

const recipeSchema = yup.object().shape({
  name: yup.string().required("Required"),
  course: yup.mixed().oneOf(ICourseValues),
  cuisine: yup.mixed().oneOf(ICuisineValues),
  servings: yup
    .number()
    .integer("Must be an integer")
    .moreThan(0, "Must be greater than 0")
});

interface IngredientValues {
  qty: number | "";
  unit: string;
  name: string;
}

interface FormValues {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IngredientValues[];
  instructions: string[];
  sources: string[];
}
interface OtherProps {
  recipe: IRecipeModel;
}
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    dirty,
    setFieldValue
  } = props;
  console.log(JSON.stringify(errors, null, 2));
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
                className={classNames("input", { "is-danger": errors.name })}
              />
            </div>
            {errors.name && <p className="help is-danger">{errors.name}</p>}
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
                    className={classNames("input", {
                      "is-danger": errors.servings
                    })}
                  />
                </div>
                {errors.servings && (
                  <p className="help is-danger">{errors.servings}</p>
                )}
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">Course</label>
                <div className="control is-expanded has-icons-left">
                  <div
                    className={classNames("select is-fullwidth", {
                      "is-danger": errors.course
                    })}
                  >
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
                  <div
                    className={classNames("select is-fullwidth", {
                      "is-danger": errors.cuisine
                    })}
                  >
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
                values.ingredients.map((ingredient, idx, ingredients) => (
                  <div className="columns" key={idx}>
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
                            onChange={(
                              e: React.FormEvent<HTMLInputElement>
                            ) => {
                              setFieldValue(
                                `ingredients.${idx}.name`,
                                e.currentTarget.value
                              );
                              if (idx === ingredients.length - 1) {
                                ingredientsHelpers.push(getDefaultIngredient());
                              }
                            }}
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
                  <div className="field" key={idx}>
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
                  <div className="field" key={idx}>
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

const getDefaultIngredient = (): IngredientValues => ({
  qty: "",
  unit: "",
  name: ""
});

const getIngredientValues = (
  ingredients: IIngredient[]
): IngredientValues[] => {
  return ingredients.map(i => ({
    qty: i.qty || "",
    unit: i.unit || "",
    name: i.name
  }));
};

const recipeFromValues = (values: FormValues): IRecipe => ({
  name: values.name,
  course: values.course,
  cuisine: values.cuisine,
  servings: values.servings,
  ingredients: values.ingredients
    .filter(i => i.name)
    .map(i => {
      const ingredient: IIngredient = { name: i.name };
      i.qty && (ingredient.qty = i.qty);
      i.unit && (ingredient.unit = i.unit);
      return ingredient;
    }),
  instructions: values.instructions.filter(i => i),
  sources: values.sources.filter(s => s)
});

interface MyFormProps {
  recipe: IRecipeModel;
  onSubmit: (recipeId: string, recipe: IRecipe) => void;
}
export const RecipeForm = withFormik<MyFormProps, FormValues>({
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
      ingredients: [
        ...getIngredientValues(ingredients),
        getDefaultIngredient()
      ],
      instructions: [...instructions, ""],
      sources: [...sources, ""]
    };
  },
  validationSchema: recipeSchema,
  handleSubmit: (values, formikBag) => {
    const { recipe, onSubmit } = formikBag.props;
    const updatedRecipe = recipeFromValues(values);
    onSubmit(recipe._id, updatedRecipe);
  }
})(InnerForm);
