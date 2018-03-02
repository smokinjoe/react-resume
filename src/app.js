import React, { Component } from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import Resume from './components/Resume';

class App extends Component {
  render () {
    return (
      <div>
        { /* <Header /> */ }
        <Main />
      </div>
    );
  }
};

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Root</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  </header>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={ Resume } />
    <Route path='/login' component={ Login } />
  </Switch>
);

const Login = () => (
  <h1>Login</h1>
);

export default App;