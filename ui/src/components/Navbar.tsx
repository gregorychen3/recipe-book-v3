import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { defaultRecipe } from "../helpers";
import { createRecipe } from "../redux/actions";

export default () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const dispatch = useDispatch();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={"/recipes"} className="navbar-item">
          <span className="icon is-large">
            <i className="fas fa-utensils" />
          </span>
          <span>
            <strong>Greg and Ally's Recipe Book</strong>
          </span>
        </Link>

        <a
          onClick={() => setShowBurgerMenu(!showBurgerMenu)}
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          role="button"
          href="#/"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={classNames("navbar-menu", { "is-active": showBurgerMenu })}
      >
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="#/">
              Browse
            </a>
            <div className="navbar-dropdown">
              <Link
                to={"/recipes?groupBy=course"}
                onClick={() => setShowBurgerMenu(false)}
                className="navbar-item"
              >
                By Course
              </Link>
              <Link
                to={"/recipes?groupBy=cuisine"}
                onClick={() => setShowBurgerMenu(false)}
                className="navbar-item"
              >
                By Cuisine
              </Link>
              <Link
                to={"/recipes?groupBy=alphabetical"}
                onClick={() => setShowBurgerMenu(false)}
                className="navbar-item"
              >
                A-Z
              </Link>
            </div>
          </div>
          <a
            className="navbar-item"
            onClick={() => {
              dispatch(createRecipe(defaultRecipe()));
              setShowBurgerMenu(false);
            }}
            href="#/"
          >
            Add Recipe
          </a>
        </div>

        <div className="navbar-end">
          <Link
            to={"/about"}
            onClick={() => setShowBurgerMenu(false)}
            className="navbar-item"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};
