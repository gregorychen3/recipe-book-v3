import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import EditRecipePage from "./pages/EditRecipePage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";

function App() {
  return (
    <Router>
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
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
