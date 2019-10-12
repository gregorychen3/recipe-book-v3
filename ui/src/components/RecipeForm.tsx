import { FormikProps, withFormik } from "formik";
import React from "react";
import { IRecipeModel } from "../../../src/db/recipe";
import { ICourse, ICuisine, IIngredient } from "../../../src/types";

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
  return <div>foo</div>;
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
    // do submitting things
  }
})(InnerForm);
