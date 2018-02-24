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

const initialResumeState = {
  data: null
};

const resume = (state = initialResumeState, action) => {
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
  LOAD_USER_DATA
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
    case LOAD_USER_DATA:
      return Object.assign({}, state, action.data);
      break;

    default:
      return state;
  }
};

/**
* Combine 'em all
*/

const reducers = {
  resume,
  user
};

const rootReducer = combineReducers(reducers);
export default rootReducer;