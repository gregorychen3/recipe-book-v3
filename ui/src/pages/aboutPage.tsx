import React, { Component } from "react";

const imagePath = "./gregandally.jpg";

const AboutPage = () => (
  <div className="container">
    <img src={imagePath} />
    <h1 className="title is-3">Greg and Ally's Recipe Book</h1>
    <h4 className="title is-4">Project Goals</h4>
    <div className="content">
      <ul>
        <li>assist in everyday cooking</li>
        <li>document research into traditional dishes</li>
        <li>learn web-development technologies</li>
      </ul>
    </div>
    <h4 className="title is-4">Tech Stack</h4>
    <a href="https://github.com/gregorychen3/recipe-book">
      <span className="icon">
        <i className="fab fa-github"></i>
      </span>
      GitHub
    </a>
    <div className="content">
      <ul>
        <li>
          v1
          <ul>
            <li>Jinja templates</li>
            <li>jQuery</li>
            <li>Python Flask API</li>
            <li>PostgreSQL</li>
            <li>Deployed to EC2</li>
          </ul>
        </li>
        <li>
          v2
          <ul>
            <li>React UI</li>
            <li>RESTful Express.js API</li>
            <li>PostgreSQL</li>
            <li>Deployed to EC2 via Docker</li>
          </ul>
        </li>
        <li>
          v3
          <ul>
            <li>React Hooks + Redux UI using Typescript</li>
            <li>RESTful Express.js API using Typescript</li>
            <li>MongoDB</li>
            <li>Deployed to Heroku</li>
          </ul>
        </li>
      </ul>
    </div>
    <h4 className="title is-4">Contact</h4>
    Kindly direct all inquiries to{" "}
    <a href="mailto:cenaacasaperdue@gmail.com">cenaacasaperdue@gmail.com</a>,
    thank you.
  </div>
);

export default AboutPage;
