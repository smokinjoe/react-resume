import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getUserData,
  getTechnicalExperiences,
  getWeaponsOfChoice,
  getEmploymentExperiences,
  getSchools,
  getProjects
} from '../../actions';

import './styles.css';

class Resume extends Component {

  constructor (props) {
    super(props);

    this.props.getUserData();
    this.props.getTechnicalExperiences();
    this.props.getWeaponsOfChoice();
    this.props.getEmploymentExperiences();
    this.props.getSchools();
    this.props.getProjects();
  }

  renderTechnicalExperience () {
    let arr = [];

    this.props.resume.technicalExperiences.forEach((exp, i) => {
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
    } = this.props.user;

    return (
      <div className={["header"]}>
        <div className={["name-email"]}>
          <span className={["name"]}>{name}<br />
            <a href={ "mailto:" + email }>{email}</a><br />
            <a href={website}>{website}</a>
          </span>
        </div>
        <div className={["address"]}>{street_address}<br />{city} {state} {zip}<br />{phone}</div>
        <div className={["clear"]}></div>
      </div>
    );
  }

  renderWeaponsOfChoice () {
    let arr = [];

    this.props.resume.weaponsOfChoice.forEach((env) => {
      arr.push(
        <li key={ env.id }>{ env.title }: { env.items.join(', ') }</li>
      );
    });

    return arr;
  }

  renderEmploymentExperiences () {
    let arr = [];

    this.props.resume.employmentExperiences.forEach((xp) => {
      let tmpArray = [];
      xp.items.forEach((r, i) => {
        tmpArray.push(
          <li key={ i }>
            { r }
          </li>
        );
      });

      arr.push(
        <div key={ xp.id }>
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

    this.props.resume.schools.forEach((school) => {
      arr.push(
        <div key={ school.id }>
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

    this.props.resume.projects.forEach((project) => {
      arr.push(
        <div key={ project.id }>
          <h3>{ project.title }</h3>
          <a href="{ project.link_url }">{ project.link_title }</a>
        </div>);
    });

    return arr;
  }

  render () {
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
        { this.renderEmploymentExperiences() }

        <h2>Education</h2>
        { this.renderSchools() }

        <h2>Projects</h2>
        <div className={["projects"]}>
          { this.renderProjects() }
        </div>

        <div className={["footer"]}>
          <span className={["refs"]}>References available upon request.</span>
        </div>
      </div>
    );
  }
}

const _stateToProps = (state) => {
  return {
    user: state.user,
    resume: state.resume
  };
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserData,
    getTechnicalExperiences,
    getWeaponsOfChoice,
    getEmploymentExperiences,
    getSchools,
    getProjects
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Resume);