import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  saveEmpoymentExperience,
  deleteEmploymentExperience
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

  renderCancelEditToggleFor (id) {
    let canEdit = this.props.edit;
    let { editing, editingId } = this.state;

    if (canEdit && (!editing || editingId === id)) {
      return (
        <button onClick={ this.toggleEditingFor.bind(this, id) }>Cancel</button>
      );
    }
  }

  handleItemArrayChange (i, event) {
    let { experience } = this.state;
    experience.items[i] = event.target.value;
    this.setState({ experience });
  }

  handleCompanyNameChange (event) {
    let { experience } = this.state;
    experience.company_name = event.target.value;
    this.setState({ experience });
  }

  handleDateStartChange (event) {
    let { experience } = this.state;
    experience.date_start = event.target.value;
    this.setState({ experience });
  }

  handleDateEndChange (event) {
    let { experience } = this.state;
    experience.date_end = event.target.value;
    this.setState({ experience });
  }

  handleSubmit () {

    this.props.saveEmpoymentExperience(this.state.experience)
      .then(() => {
        this.toggleEditingFor(this.state.experience.id);
      });

  }

  handleDelete () {
    let confirmed = window.confirm('Are you sure you want to delete?');

    if (confirmed) {
      this.props.deleteEmploymentExperience(this.state.experience)
        .then(() => {
          this.toggleEditingFor();
        });
    }
  }

  handleNewExperienceToggle () {
    let { editing, editingId } = this.state;

    if (editing && editingId === null) {
      this.setState({
        editing: false,
        experience: {}
      });
    }
    else {
      this.setState({
        editing: true,
        experience: {
          company_name: 'Company name',
          date_start: 'Date started',
          date_end: 'Date ended',
          company_role: 'Company role',
          items: ['Lorem ipsum dolor sit employment experience.']
        }
      });
    }
  }

  handleNewEmploymentItem () {
    let { experience } = this.state;
    experience.items.push('Lorem ipsum dolor sit employment experience.');
    this.setState({ experience });
  }

  handleRemoveItem (i) {
    let { experience } = this.state;

    experience.items.splice(i, 1);

    this.setState({ experience });
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
                  onChange={ this.handleItemArrayChange.bind(this, i) } />
              <button
                  type='button'
                  onClick={ this.handleRemoveItem.bind(this, i) }>
                Remove
              </button>
            </div>
          );
        });

        arr.push(
          <div key={ xp.id }>
            <input
                type='text'
                value={ xp.company_name }
                onChange={ this.handleCompanyNameChange.bind(this) } />
            { this.renderCancelEditToggleFor(xp.id) }

            <div className={['subheader']}>
              <input
                  type='text'
                  value={ xp.date_start }
                  onChange={ this.handleDateStartChange.bind(this) } />
              ~
              <input
                  type='text'
                  value={ xp.date_end }
                  onChange={ this.handleDateEndChange.bind(this) } />
              <br />
            </div>
            <ul className={['experience']}>
              { tmpArray }
            </ul>
            <button onClick={ this.handleSubmit.bind(this) }>Save</button>
            <button onClick={ this.handleDelete.bind(this) }>Delete</button>
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

  renderNewEmploymentExperienceButton () {
    if (!this.state.editing) {
      return (<button onClick={ this.handleNewExperienceToggle.bind(this) }>New Experience</button>);
    }
    else {
      return <button disabled>New Experience</button>
    }
  }

  renderCancelNewEmploymentExperienceButton () {
    return (<button onClick={ this.handleNewExperienceToggle.bind(this) }>Cancel</button>);
  }

  renderNewEmploymentExperience () {
    let { editing, editingId, experience } = this.state;

    if (editing && editingId === null) {

      let tmpArray = [];
      let arr = [];

      experience.items.forEach((r, i) => {
        tmpArray.push(
          <div key={ i }>
            <input
                type='text'
                value={ r }
                onChange={ this.handleItemArrayChange.bind(this, i) } />
          </div>
        );
      });

      tmpArray.push(
        <button key='new-employment-item' onClick={ this.handleNewEmploymentItem.bind(this) }>New</button>
      )

      arr.push(
        <div key='temp-new-form'>
          <input
              type='text'
              value={ experience.company_name }
              onChange={ this.handleCompanyNameChange.bind(this) } />
          { this.renderCancelEditToggleFor(experience.id) }

          <div className={['subheader']}>
            <input
                type='text'
                value={ experience.date_start }
                onChange={ this.handleDateStartChange.bind(this) } />
            ~
            <input
                type='text'
                value={ experience.date_end }
                onChange={ this.handleDateEndChange.bind(this) } />
            <br />
          </div>
          <ul className={['experience']}>
            { tmpArray }
          </ul>
          <button onClick={ this.handleSubmit.bind(this) }>Save</button>
        </div>
      );

      return (
        <div>
        { this.renderCancelNewEmploymentExperienceButton() }
        { arr }
        </div>
      );
    }
    else {
      return this.renderNewEmploymentExperienceButton();
    }
  }

  render () {
    return (
      <div>
        <h2>Relevant Experience</h2>
        { this.renderNewEmploymentExperience() }
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
    saveEmpoymentExperience,
    deleteEmploymentExperience
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(EmploymentExperiences);