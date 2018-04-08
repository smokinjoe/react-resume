import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getResume,
  FETCHING
} from '../../actions';

import TechnicalExperiences from '../TechnicalExperiences';
import WeaponsOfChoice from '../WeaponsOfChoice';
import EmploymentExperiences from '../EmploymentExperiences';
import Schools from '../Schools';
import Projects from '../Projects';

import './styles.css';

let Spinner = require('react-spinkit');

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
      <div className="row">
        <div className="col-4">
          <span className={["name"]}>{name}<br />
            <a href={ "mailto:" + email }>{email}</a><br />
            <a href={website}>{website}</a>
          </span>
        </div>
        <div className="col-4 offset-4 text-right">
          <div className={["address"]}>{street_address}<br />{city} {state} {zip}<br />{phone}</div>
          <div className={["clear"]}></div>
        </div>
      </div>
    );
  }

  render () {

    if (this.props.status === FETCHING) {
      return (
        <div className='absolute-middle'>
          <h3>Please wait...</h3>
          <Spinner name="cube-grid" />
        </div>
      );
    }

    return (
      <div className="container yes-margin-bottom">
        <div className="row">
          <div className="col">
            { this.renderHeader() }
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TechnicalExperiences
                data={ this.props.resume.technicalExperiences }
                edit={ this.props.edit } />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <WeaponsOfChoice
                data={ this.props.resume.weaponsOfChoice }
                edit={ this.props.edit } />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <EmploymentExperiences
                data={ this.props.resume.employmentExperiences }
                edit={ this.props.edit } />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Schools
                data={ this.props.resume.schools }
                edit={ this.props.edit } />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Projects
                data={ this.props.resume.projects }
                edit={ this.props.edit } />
          </div>
        </div>

        <div>
          <h5>References available upon request.</h5>
        </div>

      </div>
    );
  }
}

const _stateToProps = (state) => {
  return {
    user: state.user,
    resume: state.resume,
    status: state.loading.state
  };
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getResume
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Resume);