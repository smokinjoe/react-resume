import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  login
} from '../../actions';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
              type='text'
              name='username'
              placeholder='username'
              autoComplete='false'
              required
              value={ this.state.username }
              onChange={ this.handleChange.bind(this) } />
          <input
              type='password'
              name='password'
              placeholder='password'
              autoComplete='false'
              required
              value={ this.state.password }
              onChange={ this.handleChange.bind(this) } />
          <button onClick={ this.handleSubmit.bind(this) }>Sign in</button>
        </form>
      </div>
    );
  }

};

const _stateToProps = (state) => {
  return {
    token: state.token
  };
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    login
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Login);