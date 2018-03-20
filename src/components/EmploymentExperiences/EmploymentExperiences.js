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
      editing: false,
      editingId: null,
      experience: {}
    };
  }

  toggleEditingFor (id) {
    console.log('JOE: id: ', id);

    if (this.state.editing) {
      this.setState({
        editing: false,
        editingId: null,
        experience: {}
      });

    }
    else {
      let experience = this.props.data.filter(obj => obj.id === id).pop();

      this.setState({
        editing: true,
        editingId: id,
        experience: experience
      });

    }
  }

  renderEditToggleFor (id) {
    let canEdit = this.props.edit;

    if (canEdit) {
      return (
        <button onClick={ this.toggleEditingFor.bind(this, id) }>Edit</button>
      );
    }
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
          <h3>{ xp.company_name } { this.renderEditToggleFor(xp.id) }</h3>
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