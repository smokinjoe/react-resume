import React, { Component } from 'react';
import {
  FETCHING,
  ERROR
} from '../actions';

import './LoaderHOC.css';

let Spinner = require('react-spinkit');

const LoaderHOC = (WrappedComponent) => {
  return class LoaderHOC extends Component {
    render () {
      // if (this.props.status === FETCHING) {
        return (
          <div className='absolute-middle'>
            <h3>Please wait...</h3>
            <Spinner name="cube-grid" />
          </div>
        );
      // }

      // if (this.props.status === ERROR) {
      //   return (
      //     <div className='wider-absolute-middle'>
      //       There appears to be an error. Please view a static copy of my awesome resume at, <a href="http://ekiert.net/joe-ekiert-resume.pdf">this location.</a>
      //     </div>
      //   );
      // }

      return <WrappedComponent { ...this.props } />
    }

  }
};

export default LoaderHOC;