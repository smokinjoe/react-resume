// Borrowed from: https://www.youtube.com/watch?v=LTunyI2Oyzw

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getResume,
  FETCHING,
  ERROR,
  IDLE
} from '../actions';

import './LoaderHOC.css';

let Spinner = require('react-spinkit');

const LoaderHOC = (WrappedComponent) => {
  class LoaderHOC extends Component {
    constructor (props) {
      super(props);
      this.props.getResume();
    }

    render () {

      if (this.props.status === ERROR) {
        return (
          <div className='wider-absolute-middle'>
            There appears to be an error. Please view a static copy of my awesome resume at, <a href="http://ekiert.net/joe-ekiert-resume.pdf">this location.</a>
          </div>
        );
      }

      if (this.props.status === IDLE) {
        console.log(this.props.resume);
        return <WrappedComponent { ...this.props } />
      }

      return (
        <div className='absolute-middle'>
          <h3>Please wait...</h3>
          <Spinner name="cube-grid" />
        </div>
      );
    }

  }

  const _dispatchToProps = (dispatch) => {
    return bindActionCreators({
      getResume
    }, dispatch);
  };

  const _stateToProps = (state) => {
    return {
      resume: state.resume,
      status: state.loading.state
    };
  };

  return connect(_stateToProps, _dispatchToProps)(LoaderHOC);
  // return LoaderHOC;
};

// export default connect(_stateToProps)(LoaderHOC);
export default LoaderHOC;