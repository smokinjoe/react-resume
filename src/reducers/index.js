/* eslint-disable import/first */
// JOE: the lame way I deal with reducers is that I like having reducer
// blocks, which causes all sorts of parse errors since I have imports
// all over the place

/* eslint-disable no-unreachable */
// JOE: Need to do this to get lint to stop screaming at me


import { combineReducers } from 'redux';

/**
* Local .json file LOAD action
*/

import {
  GET_USER_DATA
} from '../actions';

// JOE: NOTE: this stuff will be fetched via api later
const initialUserData = {
  city: 'San Francisco',
  email: 'joe.ekiert@gmail.com',
  name: 'Joe Ekiert',
  phone: '978.375.5916',
  state: null,
  street_address: null,
  website: 'http://ekiert.net',
  zip: null
};

export const user = (state = initialUserData, action) => {
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
  GET_TECHNICAL_EXPERIENCES,
  PUT_TECHNICAL_EXPERIENCE,
  GET_WEAPONS_OF_CHOICE,
  PUT_WEAPON_OF_CHOICE,
  GET_EMPLOYMENT_EXPERIENCES,
  PUT_EMPLOYMENT_EXPERIENCE,
  POST_EMPLOYMENT_EXPERIENCE,
  DELETE_EMPLOYMENT_EXPERIENCE,
  GET_SCHOOLS,
  PUT_SCHOOL,
  GET_PROJECTS,
  PUT_PROJECT,
  POST_PROJECT,
  DELETE_PROJECT,
  GET_RESUME
} from '../actions';

// This nested array property needs to exist otherwise the array
// becomes an object due to the nature of Object.assign
const intialResumeState = {
  technicalExperiences: [],
  weaponsOfChoice: [],
  employmentExperiences: [],
  schools: [],
  projects: []
};

export const resume = (state = intialResumeState, action) => {
  switch (action.type) {
    case GET_RESUME:
      action.data.technicalExperiences.sort((a, b) => {
        return b.id - a.id;
      });
      action.data.employmentExperiences.sort((a, b) => {
        return b.id - a.id;
      });
      action.data.projects.sort((a, b) => {
        return b.id - a.id;
      });

      return Object.assign({}, state, {
        technicalExperiences: action.data.technicalExperiences,
        weaponsOfChoice: action.data.weaponsOfChoice,
        employmentExperiences: action.data.employmentExperiences,
        schools: action.data.schools,
        projects: action.data.projects
      });
      break;
    case GET_TECHNICAL_EXPERIENCES:
      action.data.sort((a, b) => {
        return b.id - a.id;
      });

      return Object.assign({}, state, {
        technicalExperiences: action.data
      });
      break;
    case GET_WEAPONS_OF_CHOICE:
      return Object.assign({}, state, {
        weaponsOfChoice: action.data
      });
      break;
    case GET_EMPLOYMENT_EXPERIENCES:
      action.data.sort((a, b) => {
        return b.id - a.id;
      });

      return Object.assign({}, state, {
        employmentExperiences: action.data
      });
      break;
    case PUT_SCHOOL:
      state.schools.forEach((obj, i) => {
        if (obj.id === action.data.id) {
          state.schools[i] = action.data;
        }
      });
      return Object.assign({}, state, {
        schools: state.schools
      });
      break;
    case GET_SCHOOLS:
      return Object.assign({}, state, {
        schools: action.data
      });
      break;
    case GET_PROJECTS:
      return Object.assign({}, state, {
        projects: action.data
      });
      break;
    case PUT_PROJECT:
      state.projects.forEach((obj, i) => {
        if (obj.id === action.data.id) {
          state.projects[i] = action.data
        }
      });
      return Object.assign({}, state, {
        projects: state.projects
      });
      break;
    case POST_PROJECT:
      state.projects.push(action.data);
      return Object.assign({}, state, {
        projects: state.projects
      });
      break;
    case DELETE_PROJECT:
      let projectsArr = state.projects.filter(obj => obj.id !== action.data.id);
      return Object.assign({}, state, {
        projects: projectsArr
      });
      break;
    case PUT_TECHNICAL_EXPERIENCE:
      state.technicalExperiences.forEach((exp, i) => {
        if (exp.id === action.data.id) {
          state.technicalExperiences[i] = action.data;
        }
      });

      return Object.assign({}, state, state.technicalExperiences);
      break;
    case PUT_WEAPON_OF_CHOICE:
      state.weaponsOfChoice.forEach((obj, i) => {
        if (obj.id === action.data.id) {
          state.weaponsOfChoice[i] = action.data;
        }
      });

      return Object.assign({}, state, state.weaponsOfChoice);
      break;
    case PUT_EMPLOYMENT_EXPERIENCE:
      state.employmentExperiences.forEach((obj, i) => {
        if (obj.id === action.data.id) {
          state.employmentExperiences[i] = action.data;
        }
      });

      return Object.assign({}, state, state.employmentExperiences);
      break;
    case POST_EMPLOYMENT_EXPERIENCE:
      state.employmentExperiences.unshift(action.data);
      return Object.assign({}, state, {
        employmentExperiences: state.employmentExperiences
      });
      break;
    case DELETE_EMPLOYMENT_EXPERIENCE:
      let eeArr = state.employmentExperiences.filter(obj => obj.id !== action.data.id);
      return Object.assign({}, state, {
        employmentExperiences: eeArr
      });
      break;
    default:
      return state;
  }
};


/**
* Login and get that token!
*/

import {
  LOGIN,
  LOGIN_ERROR
} from '../actions';

import {
  LOCAL_STORAGE
} from '../utils/constants';

const initialToken = {
  data: localStorage.getItem(LOCAL_STORAGE.API_TOKEN)
};

export const token = (state = initialToken, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(LOCAL_STORAGE.API_TOKEN, action.data);
      return Object.assign({}, state, {
        data: action.data
      });
      break;
    default:
      return state;
  }
};

/**
* loading feedback dealie
*/

import {
  IDLE,
  FETCHING,
  ERROR
} from '../actions';

const initialLoadingState = {
  state: IDLE
};

export const loading = (state = initialLoadingState, action) => {
  switch (action.type) {
    case IDLE:
      return Object.assign({}, state, {
        state: IDLE
      });
      break;

    case FETCHING:
      return Object.assign({}, state, {
        state: FETCHING
      });
      break;

    case ERROR:
      return Object.assign({}, state, {
        state: ERROR
      });
      break;

    default:
      return state;
  }
};

/**
* Combine 'em all
*/

const reducers = {
  loading,
  user,
  resume,
  token
};

const rootReducer = combineReducers(reducers);
export default rootReducer;