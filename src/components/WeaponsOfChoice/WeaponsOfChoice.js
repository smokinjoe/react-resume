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

  renderWeaponsOfChoice () {
    let arr = [];

    this.props.data.forEach((env) => {
      arr.push(
        <li key={ env.id }>{ env.title }: { env.items.join(', ') }</li>
      );
    });

    return arr;
  }

  render () {
    return (
      <div>
        <h2>Weapons of Choice</h2>
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