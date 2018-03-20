import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  putWeaponOfChoice
} from '../../actions';

class WeaponsOfChoice extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  toggleEditing () {
    if (this.props.edit) {
      this.props.data.forEach(obj => {
        this.setState({
          [obj.id]: {
            title: obj.title,
            items: obj.items.join(',')
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

    this.props.putWeaponOfChoice(payload).then(() => {
      this.toggleEditing();
    });
  }

  renderWeaponsOfChoice () {
    let { editing } = this.state;
    let arr = [];

    if (editing) {
      this.props.data.forEach(obj => {
        arr.push(
          <div key={ obj.id }>
            { obj.title }:
            <input
                type='text'
                value={ this.state[obj.id].items }
                onChange={ this.handleChange.bind(this, obj.id) } />
            <button onClick={ this.handleSubmit.bind(this, obj.id) }>Save</button>
          </div>
        )
      });

    }
    else {
      this.props.data.forEach((env) => {
        arr.push(
          <li key={ env.id }>{ env.title }: { env.items.join(', ') }</li>
        );
      });
    }

    return arr;
  }

  renderEditToggle () {
    let canEdit = this.props.edit;

    if (canEdit) {
      return (
        <button onClick={ this.toggleEditing.bind(this) }>Edit</button>
      )
    }
  }

  render () {
    return (
      <div>
        <h2>Weapons of Choice { this.renderEditToggle() } </h2>
        <ul className={["weapons-of-choice"]}>
          { this.renderWeaponsOfChoice() }
        </ul>
      </div>
    );
  }

};

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    putWeaponOfChoice
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(WeaponsOfChoice);