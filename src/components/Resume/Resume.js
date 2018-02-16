import React, { Component } from 'react';
import './Resume.css';

const json = require('../../resume.json');

// JOE: TODO: https://stackoverflow.com/a/43892905/355627

class Resume extends Component {

  renderTechnicalExperience () {
    let arr = [];

    json.technical_experience.forEach((exp, i) => {
      arr.push(
        <li key={ i }>{ exp.title }: { exp.items.join(', ') }</li>
      );
    });

    return arr;
  }

  renderHeader () {
    const {
      name,
      email,
      website,
      street_address,
      city,
      state,
      zip,
      phone
    } = json;

    return (
      <div className={["header"]}>
        <div className={["name-email"]}>
          <span className={["name"]}>{name}<br />
            <a href="mailto:{email}">{email}</a><br />
            <a href="{website}">{website}</a>
          </span>
        </div>
        <div className={["address"]}>{street_address}<br />{city} {state} {zip}<br />{phone}</div>
        <div className={["clear"]}></div>
      </div>
    );
  }

  renderWeaponsOfChoice () {
    let arr = [];

    json.weapons_of_choice.forEach((env, i) => {
      arr.push(
        <li key={ i }>{ env.title }: { env.items.join(', ') }</li>
      );
    });

    return arr;
  }

  renderRelevantExperience () {
    let arr = [];

    json.relevant_experience.forEach((xp, i) => {
      let tmpArray = [];
      xp.responsibilities.forEach((r, i) => {
        tmpArray.push(
          <li key={ i }>
            { r.description }
          </li>
        );
      });

      arr.push(
        <div key={ i }>
          <h3>{ xp.company_name }</h3>
          <div className={['subheader']}>
            { xp.date_start } ~ { xp.date_end }
          </div>
          <ul className={['experience']}>
            { tmpArray }
          </ul>
        </div>
      );

    });

    return arr;
  }

  renderSchools () {
    let arr = [];

    json.schools.forEach((school, i) => {
      arr.push(
        <div key={ i }>
          <h3>{ school.school_name }</h3>
          <div className={['subheader']}>
            { school.wut }<br />
            { school.date_of_graduation }
          </div>
        </div>
      );
    });

    return arr;
  }

  renderProjects () {
    let arr = [];

    json.projects.forEach((project, i) => {
      arr.push(
        <div key={ i }>
          <h3>project.title</h3>
          <a href="{ project.link_url }">{ project.link_title }</a>
        </div>);
    });

    return arr;
  }

  render () {
    const { references } = json;

    return (
      <div id="container">
        { this.renderHeader() }

        <div>
          <h2>Technical Experience</h2>
          <ul className={["technical-experience"]}>
            { this.renderTechnicalExperience() }
          </ul>
        </div>

        <h2>Weapons of Choice</h2>
        <ul className={["weapons-of-choice"]}>
          { this.renderWeaponsOfChoice() }
        </ul>

        <h2>Relevant Experience</h2>
        { this.renderRelevantExperience() }

        <h2>Education</h2>
        { this.renderSchools() }

        <h2>Projects</h2>
        <div className={["projects"]}>
          { this.renderProjects() }
        </div>

        <div className={["footer"]}>
          <span className={["refs"]}>{ references }</span>
        </div>
      </div>
    );
  }
}

export default Resume;