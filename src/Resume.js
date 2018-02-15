import React, { Component } from 'react';
import './Resume.css';

const json = require('./resume.json');

class Resume extends Component {
  constructor (props) {
    super(props);
  }

  renderTechnicalExperience () {
    let arr = [];

    json.technical_experience.forEach((exp) => {
      let tmpArr = [];
      exp.items.forEach((item) => {
        tmpArr.push(item);
      });

      arr.push(<li>{exp.title}: {tmpArr}</li>)
    });

    return (arr);
  }

  renderWeaponsOfChoice () {

    return null;
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
      technical_experience,
      weapons_of_choice,
      relevant_experience,
      schools,
      projects,
      references
    } = json;

    return (
      <div class="header">
        <div class="name-email">
          <span class="name">{name}<br />
            <a href="mailto:{email}">{email}</a><br />
            <a href="{website}">{website}</a>
          </span>
        <div class="address">{street_address}<br />{city} {state} {zip}<br />{phone}</div>
        <div class="clear"></div>
      </div>

      <h2>Technical Experience</h2>
      <ul class="technical-experience">
        { this.renderTechnicalExperience() }
      </ul>

      <h2>Weapons of Choice</h2>
      <ul class="weapons-of-choice">
        {{each weapons_of_choice}}
        <li>{$value.title}: {{each $value.items}}{{if !$index}}{$value}{{else}}, {$value}{{/if}}{{/each}}</li>
        {{/each}}
      </ul>

      <h2>Relevant Experience</h2>
      {{each relevant_experience}}
        <h3>{$value.company_name}</h3>
        <div class="subheader">{$value.company_role}<br />
        {$value.date_start} ~ {$value.date_end} </div>
        <ul class="experience">
          {{each $value.responsibilities}}<li>{$value.description}</li>{{/each}}
        </ul>
      {{/each}}


      <h2>Education</h2>
      {{each schools}}
        <h3>{$value.school_name}</h3>
        <div class="subheader">{$value.wut}<br />{$value.date_of_graduation}</div>
      {{/each}}

      <h2>Projects</h2>
      <div class="projects">
      {{each projects}}
        <h3>{$value.title}</h3>
        <a href="{$value.link_url}">{$value.link_title}</a>
      {{/each}}
      </div>

      <div class="footer">
        <span class="refs">{references}</span>
      </div>
    );
  }
}

export default Resume;