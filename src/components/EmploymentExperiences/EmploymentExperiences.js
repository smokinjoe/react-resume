import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  putEmpoymentExperience
} from '../../actions';

class EmploymentExperiences extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  renderEmploymentExperiences () {
    let arr = [];

    this.props.data.forEach((xp) => {
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

  render () {
    return (
      <div>
        <h2>Relevant Experience</h2>
        { this.renderEmploymentExperiences() }
      </div>
    );
  }
};

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    putEmpoymentExperience
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(EmploymentExperiences);