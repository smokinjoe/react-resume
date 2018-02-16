import React, { Component } from 'react';
import './Resume.css';

const json = require('./resume.json');

// JOE: TODO: https://stackoverflow.com/a/43892905/355627

class Resume extends Component {
  constructor (props) {
    super(props);
  }

  renderTechnicalExperience () {
    let arr = [];

    json.technical_experience.forEach((exp, i) => {
      arr.push(<li key={ i }>{ exp.title }: { exp.items.join(', ') }</li>);
    });

    return arr;
  }

  renderWeaponsOfChoice () {
    let arr = [];

    json.weapons_of_choice.forEach(env => {
      arr.push(<li>{ env.title }: { env.items.join(', ') }</li>);
    });

    return arr;
  }

  renderRelevantExperience () {
    // {{each relevant_experience}}
    //   <h3>{$value.company_name}</h3>
    //   <div class="subheader">{$value.company_role}<br />
    //   {$value.date_start} ~ {$value.date_end} </div>
    //   <ul class="experience">
    //     {{each $value.responsibilities}}<li>{$value.description}</li>{{/each}}
    //   </ul>
    // {{/each}}

    let arr = [];

    json.relevant_experience.forEach(xp => {
      arr.push(<h3>{ xp.company_name }</h3>)

      // WIP:
    });

    return arr;
  }

  renderSchools () {
    // {{each schools}}
    //   <h3>{$value.school_name}</h3>
    //   <div class="subheader">{$value.wut}<br />{$value.date_of_graduation}</div>
    // {{/each}}

    let arr = [];

    json.schools.forEach(school => {
      arr.push(<div><h3>{ school.school_name }</h3><div class="subheader">{ school.wut }<br />{ school.date_of_graduation }</div></div>)
    });

    return arr;
  }

  renderProjects () {
    // {{each projects}}
    //   <h3>{$value.title}</h3>
    //   <a href="{$value.link_url}">{$value.link_title}</a>
    // {{/each}}

    let arr = [];

    json.projects.forEach(project => {
      arr.push(<div><h3>project.title</h3><a href="{ project.link_url }">{ project.link_title }</a></div>);
    });

    return arr;
  }

  render () {
    const {
      name,
      email,
      website,
      street_address,
      city,
      state,
      zip,
      phone,
      // technical_experience,
      // weapons_of_choice,
      // relevant_experience,
      // schools,
      // projects,
      references
    } = json;

    return (
      <div>
        <div class="header">
          <div class="name-email">
            <span class="name">{name}<br />
              <a href="mailto:{email}">{email}</a><br />
              <a href="{website}">{website}</a>
            </span>
          </div>
          <div class="address">{street_address}<br />{city} {state} {zip}<br />{phone}</div>
          <div class="clear"></div>
        </div>

        <div>
          <h2>Technical Experience</h2>
          <ul class="technical-experience">
            { this.renderTechnicalExperience() }
          </ul>
        </div>

        <h2>Weapons of Choice</h2>
        <ul class="weapons-of-choice">
          { this.renderWeaponsOfChoice() }
        </ul>

        <h2>Relevant Experience</h2>
        { this.renderRelevantExperience() }

        <h2>Education</h2>
        { this.renderSchools() }

        <h2>Projects</h2>
        <div class="projects">
          { this.renderProjects() }
        </div>

        <div class="footer">
          <span class="refs">{ references }</span>
        </div>
      </div>
    );
  }
}

export default Resume;