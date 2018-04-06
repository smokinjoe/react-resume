import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  putTechnicalExperience
} from '../../actions';

class TechnicalExperiences extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false
    };

  }

  toggleEditing () {
    if (this.props.edit) {
      this.props.data.forEach(exp => {
        this.setState({
          [exp.id]: {
            title: exp.title,
            items: exp.items.join(',')
          }
        });
      });
    }

    this.setState({
      editing: !this.state.editing
    });
  }

  handleChange (id, event) {
    this.setState({
      [id]: {
        title: this.state[id].title,
        items: event.target.value
      }
    });
  }

  handleSubmit (id) {
    let payload = {
      id: id,
      items: this.state[id].items.split(','),
      title: this.state[id].title
    };

    this.props.putTechnicalExperience(payload).then(() => {
      this.toggleEditing();
    });
  }

  renderTechnicalExperience () {
    let { editing } = this.state;
    let arr = [];

    if (editing) {
      this.props.data.forEach(exp => {
        arr.push(
          <div key={ exp.id }>
            { exp.title }:
            <input
                type='text'
                value={ this.state[exp.id].items }
                onChange={ this.handleChange.bind(this, exp.id) } />
            <button onClick={ this.handleSubmit.bind(this, exp.id) }>Save</button>
          </div>
        )
      });
    }
    else {
      this.props.data.forEach((exp) => {
        arr.push(
          <li key={ exp.id }><strong>{ exp.title }:</strong> { exp.items.join(', ') }</li>
        );
      });

    }

    return arr;

  }

  renderEditToggle () {
    let canEdit = this.props.edit;
    let btnText = this.state.editing ? 'Cancel' : 'Edit';

    if (canEdit) {
      return (
        <button onClick={ this.toggleEditing.bind(this) }>
          { btnText }
        </button>
      )
    }
  }

  render () {
    return (
      <div>
        <h3>Technical Experience { this.renderEditToggle() }</h3>
        <ul className={["technical-experience"]}>
          { this.renderTechnicalExperience() }
        </ul>
      </div>
    );

  }

}

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    putTechnicalExperience
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(TechnicalExperiences);