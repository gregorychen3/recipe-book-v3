import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
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
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            href="#/"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="#/">
                Browse
              </a>
              <div className="navbar-dropdown">
                <Link to={"/recipes"} className="navbar-item">
                  By Course
                </Link>
                <Link to={"/recipes"} className="navbar-item">
                  By Cuisine
                </Link>
                <Link to={"/recipes"} className="navbar-item">
                  A-Z
                </Link>
              </div>
            </div>
            <a className="navbar-item" href="#/">
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
  }
}
