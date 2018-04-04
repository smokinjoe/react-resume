import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getResume
} from '../../actions';

import TechnicalExperiences from '../TechnicalExperiences';
import WeaponsOfChoice from '../WeaponsOfChoice';
import EmploymentExperiences from '../EmploymentExperiences';
import Schools from '../Schools';
import Projects from '../Projects';

import './styles.css';

class Resume extends Component {

  constructor (props) {
    super(props);
    this.props.getResume();
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

  render () {
    return (
      <div id="container">
        { this.renderHeader() }

        <TechnicalExperiences
            data={ this.props.resume.technicalExperiences }
            edit={ this.props.edit } />

        <WeaponsOfChoice
            data={ this.props.resume.weaponsOfChoice }
            edit={ this.props.edit } />

        <EmploymentExperiences
            data={ this.props.resume.employmentExperiences }
            edit={ this.props.edit } />

        <Schools
            data={ this.props.resume.schools }
            edit={ this.props.edit } />

        <Projects
            data={ this.props.resume.projects }
            edit={ this.props.edit } />

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
    getResume
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Resume);