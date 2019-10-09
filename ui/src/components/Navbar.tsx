import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <span className="icon">
              <i className="fas fa-utensils" />
            </span>
            <span>
              <strong>Greg and Ally's Recipe Book</strong>
            </span>
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Browse</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">By Course</a>
                <a className="navbar-item">By Cuisine</a>
                <a className="navbar-item">A-Z</a>
              </div>
            </div>
            <a className="navbar-item">Add Recipe</a>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">About</a>
          </div>
        </div>
      </nav>
    );
  }
}
