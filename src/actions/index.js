/**
* options:
*   endpoint
*   callback
*/
const _get = (options = {}) => {
  const URL = 'http://localhost:8080/v1/';
  // const API_URI = '?api_key=6BYfKXXVP3gjt9wT9RybkE';

  if (typeof options.endpoint === 'undefined') {
    console.error('ERROR: You need to supply an endpoint.');
    return;
  }

  // let url = URL + options.endpoint + API_URI;
  let url = URL + options.endpoint;

  // JOE: NOTE: needs some sort of error logging

  fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Authorization': 'Bearer ' + process.env.REACT_APP_JOE_RESUME_API_SECRET,
      'Content-Type': 'Content-Type: application/json'
    }
  })
  .then(response => response.json())
  .then(items => {
    if (typeof options.callback === 'function') {
      options.callback(items);
    }
  });

};

/**
* Load resume data from local json file
*/

export const LOAD_RESUME = 'LOAD_RESUME';
export const loadResume = () => (dispatch) => _loadResume(dispatch);

const _loadResume = (dispatch) => {
  const json = require('../resume.json');

  dispatch({
    type: LOAD_RESUME,
    data: json
  });
};

/**
* Load user data from API endpoint
*/

export const GET_USER_DATA = 'GET_USER_DATA';
export const getUserData = () => (dispatch) => _getUserData(dispatch);

const _getUserData = (dispatch) => {

  _get({
    endpoint: 'users',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_USER_DATA,
          data: items.payload.pop()
        });
      }
    }
  })

};

/**
* Load technical experience from API endpoint
*/

export const GET_TECHNICAL_EXPERIENCES = 'LOAD_TECHNICAL_EXPERIENCES';
export const getTechnicalExperiences = () => (dispatch) => _getTechnicalExperiences(dispatch);

const _getTechnicalExperiences = (dispatch) => {
  _get({
    endpoint: 'technical_experiences',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_TECHNICAL_EXPERIENCES,
          data: items.payload
        });
      }
    }

  });
};

/**
* Load weapons of choice from API endpoint
*/

export const GET_WEAPONS_OF_CHOICE = 'GET_WEAPONS_OF_CHOICE';
export const getWeaponsOfChoice = () => (dispatch) => _getWeaponsOfChoice(dispatch);

const _getWeaponsOfChoice = (dispatch) => {
  _get({
    endpoint: 'weapons_of_choice',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_WEAPONS_OF_CHOICE,
          data: items.payload
        });
      }
    }

  });
};

/**
* Load employment experiences from API endpoint
*/

export const GET_EMPLOYMENT_EXPERIENCES = 'GET_EMPLOYMENT_EXPERIENCES';
export const getEmploymentExperiences = () => (dispatch) => _getEmploymentExperiences(dispatch);

const _getEmploymentExperiences = (dispatch) => {
  _get({
    endpoint: 'employment_experiences',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_EMPLOYMENT_EXPERIENCES,
          data: items.payload
        });
      }
    }

  });
};

/**
* Load schools from API endpoint
*/

export const GET_SCHOOLS = 'GET_SCHOOLS';
export const getSchools = () => (dispatch) => _getSchools(dispatch);

const _getSchools = (dispatch) => {
  _get({
    endpoint: 'schools',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_SCHOOLS,
          data: items.payload
        });
      }
    }

  });
};

/**
* Load projects from API endpoint
*/

export const GET_PROJECTS = 'GET_PROJECTS';
export const getProjects = () => (dispatch) => _getProjects(dispatch);

const _getProjects = (dispatch) => {
  _get({
    endpoint: 'projects',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: GET_PROJECTS,
          data: items.payload
        });
      }
    }

  });
};