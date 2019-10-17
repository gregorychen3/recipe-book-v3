import classNames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { defaultRecipe } from "../helpers";
import { ActionTypes, createRecipe } from "../redux/actions";

interface Props {
  createRecipe: typeof createRecipe;
}
const Navbar = ({ createRecipe }: Props) => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to={"/recipes"} className="navbar-item">
          <span className="icon">
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
              <Link to={"/recipes?groupBy=course"} className="navbar-item">
                By Course
              </Link>
              <Link to={"/recipes?groupBy=cuisine"} className="navbar-item">
                By Cuisine
              </Link>
              <Link
                to={"/recipes?groupBy=alphabetical"}
                className="navbar-item"
              >
                A-Z
              </Link>
            </div>
          </div>
          <a
            className="navbar-item"
            onClick={() => createRecipe(defaultRecipe())}
            href="#/"
          >
            Add Recipe
          </a>
        </div>

        <div className="navbar-end">
          <Link to={"/about"} className="navbar-item">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
  bindActionCreators({ createRecipe }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(Navbar);
