import React from "react";

const imagePath = "./gregandally.jpg";

const AboutPage = () => (
  <section className="section">
    <div className="container">
      <img src={imagePath} alt="gregandally" />
      <h1 className="title is-spaced">Greg and Ally's Recipe Book</h1>
      <div className="subtitle">Project Goals</div>
      <div className="content">
        <ul>
          <li>assist in everyday cooking</li>
          <li>document research into traditional dishes</li>
          <li>learn web-development technologies</li>
        </ul>
      </div>
      <a href="https://github.com/gregorychen3/recipe-book">
        <span className="subtitle">Tech Stack</span>
        <span className="icon" style={{ marginLeft: "5px" }}>
          <i className="fab fa-github" />
        </span>
      </a>
      <div className="content">
        <ul>
          <li>
            v1
            <ul>
              <li>Jinja Template HTML + CSS</li>
              <li>jQuery</li>
              <li>Python Flask API</li>
              <li>PostgreSQL</li>
              <li>Deployed to EC2</li>
            </ul>
          </li>
          <li>
            v2
            <ul>
              <li>React + Semantic UI</li>
              <li>Express.js REST API</li>
              <li>PostgreSQL</li>
              <li>Deployed to EC2 via Docker</li>
            </ul>
          </li>
          <li>
            v3
            <ul>
              <li>React Hooks + Redux + Bulma UI</li>
              <li>Express.js REST API</li>
              <li>MongoDB</li>
              <li>TypeScript</li>
              <li>Deployed to Heroku</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="subtitle">Contact</div>
      Kindly direct all inquiries to
      <a href="mailto:cenaacasaperdue@gmail.com"> cenaacasaperdue@gmail.com</a>,
      thank you.
    </div>
  </section>
);

export default AboutPage;
