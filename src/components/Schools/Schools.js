import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  saveSchool
} from '../../actions';

class Schools extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      school: {},
      editingId: null
    };
  }

  toggleEditing (school) {
    if (this.props.edit) {
      if (this.state.editing) {
        this.setState({
          editing: false,
          school: {},
          editingId: null
        });
      }
      else {
        this.setState({
          editing: true,
          school: school,
          editingId: school.id
        });
      }
    }
  }

  handleChange (key, event) {
    let { school } = this.state;
    school[key] = event.target.value;
    this.setState({ school });
  }

  handleSubmit () {
    let { school } = this.state;
    this.props.saveSchool(school)
      .then(() => this.toggleEditing(school));
  }

  renderSchools () {
    let arr = [];
    let { editing, school, editingId } = this.state;

    this.props.data.forEach((school) => {
      if (editingId === school.id) {
        arr.push(
          <div key={ school.id }>
            <input
                type='text'
                value={ school.school_name }
                onChange={ this.handleChange.bind(this, 'school_name') } />
            <br />
            <input
                type='text'
                value={ school.wut }
                onChange={ this.handleChange.bind(this, 'wut') } />
            <br />
            <input
                type='text'
                value={ school.date_of_graduation }
                onChange={ this.handleChange.bind(this, 'date_of_graduation') } />
            <br />

            <button onClick={ this.handleSubmit.bind(this) }>Save</button>
            { this.renderEditToggle(school) }
          </div>
        );
      }
      else {
        arr.push(
          <div key={ school.id }>
            <h3>{ school.school_name } { this.renderEditToggle(school) }</h3>
            <div className={['subheader']}>
              { school.wut }<br />
              { school.date_of_graduation }
            </div>
          </div>
        );
      }

    });

    return arr;
  }

  renderEditToggle (school) {
    if (this.props.edit) {
      let btnText = this.state.editing ? 'Cancel' : 'Edit';
      return <button onClick={ this.toggleEditing.bind(this, school) }>{ btnText }</button>;
    }
  }

  render () {
    return (
      <div>
        <h2>Education</h2>
        { this.renderSchools() }
      </div>
    );
  }
};

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveSchool
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Schools);
