import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";

export const history = createBrowserHistory();

export default () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/recipes" />
        </Route>
        <Route exact path="/recipes">
          <RecipesPage />
        </Route>
        <Route exact path="/recipes/:recipeId/edit">
          <EditRecipePage />
        </Route>
        <Route exact path="/recipes/:recipeId">
          <RecipePage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
      </Switch>
    </Router>
  );
};
