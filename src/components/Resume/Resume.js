import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderHOC from '../../HOC/LoaderHOC';

import TechnicalExperiences from '../TechnicalExperiences';
import WeaponsOfChoice from '../WeaponsOfChoice';
import EmploymentExperiences from '../EmploymentExperiences';
import Schools from '../Schools';
import Projects from '../Projects';

import './styles.css';

class Resume extends Component {

  constructor (props) {
    super(props);
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
      <div className="mb-4 mt-4 row">
        <div className="col-4">
          <h2>{name}</h2>
          <a href={ "mailto:" + email }>{email}</a>
        </div>
        <div className="col-4 offset-4 text-right">
          {city}<br />
          {phone}
        </div>
      </div>
    );
  }

  render () {
    let { website } = this.props.user;

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

        <div className="mt-5">
          <a href={website + '/joe-ekiert-resume.pdf'}>Download PDF of resume</a>
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

export default connect(_stateToProps)(LoaderHOC(Resume));