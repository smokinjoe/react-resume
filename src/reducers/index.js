/* eslint-disable import/first */
// JOE: the lame way I deal with reducers is that I like having reducer
// blocks, which causes all sorts of parse errors since I have imports
// all over the place

import { combineReducers } from 'redux';

/**
* Local .json file LOAD action
*/

import {
  LOAD_RESUME
} from '../actions';

const initialResumeStateTmp = {
  data: null
};

const resumeTmp = (state = initialResumeStateTmp, action) => {
  switch (action.type) {
    case LOAD_RESUME:
      return Object.assign({}, state, {
        data: action.data
      });
    break;
    default:
      return state;
  }
};

/**
* Load user data from API endpoint
*/

import {
  GET_USER_DATA
} from '../actions';

const initialUserData = {
  city: null,
  email: null,
  name: null,
  phone: null,
  state: null,
  street_address: null,
  website: null,
  zip: null
};

const user = (state = initialUserData, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return Object.assign({}, state, action.data);
      break;

    default:
      return state;
  }
};

/**
* Load resume data
*/

import {
  GET_TECHNICAL_EXPERIENCES
} from '../actions';

// This nested array property needs to exist otherwise the array
// becomes an object due to the nature of Object.assign
const intialResumeState = {
  technicalExperiences: []
};

const resume = (state = intialResumeState, action) => {
  switch (action.type) {
    case GET_TECHNICAL_EXPERIENCES:
      return Object.assign({}, state, {technicalExperiences: action.data});
      break;
    default:
      return state;
  }
};


/**
* Combine 'em all
*/

const reducers = {
  resumeTmp,
  user,
  resume
};

const rootReducer = combineReducers(reducers);
export default rootReducer;