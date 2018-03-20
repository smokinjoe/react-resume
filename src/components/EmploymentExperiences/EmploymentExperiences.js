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
    let { editing, editingId } = this.state;

    if (canEdit && (!editing || editingId === id)) {
      return (
        <button onClick={ this.toggleEditingFor.bind(this, id) }>Edit</button>
      );
    }
  }

  handleChange (i, event) {
    console.log('JOE: i: ', i);
    console.log('JOE: event.target.value: ', event.target.value);

    let { experience } = this.state;

    experience.items.forEach((obj, _i) => {
      if (_i === i) {
        obj = event.target.value
      }
    });

    this.setState({ experience });
  }

  handleSubmit () {
    console.log('JOE: this.state.experience: ', this.state.experience);
  }

  renderEmploymentExperiences () {
    let arr = [];
    let { experience, editingId } = this.state;

    this.props.data.forEach((xp) => {

      if (editingId === xp.id) {

        let tmpArray = [];
        experience.items.forEach((r, i) => {
          tmpArray.push(
            <div key={ i }>
              <input
                  type='text'
                  value={ r }
                  onChange={ this.handleChange.bind(this, i) } />
              <button onClick={ this.handleSubmit.bind(this) }>Save</button>
            </div>
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

      }
      else {

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

      }

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