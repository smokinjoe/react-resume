/**
* options:
*   endpoint
*   callback
*/
const _get = (options = {}) => {
  const URL = 'http://localhost:8080/v1/';
  const API_URI = '?api_key=6BYfKXXVP3gjt9wT9RybkE';

  if (typeof options.endpoint === 'undefined') {
    console.error('ERROR: You need to supply an endpoint.');
    return;
  }

  let url = URL + options.endpoint + API_URI;

  // JOE: NOTE: needs some sort of error logging

  fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + process.env.REACT_APP_JOE_RESUME_API_SECRET,
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

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const loadUserData = () => (dispatch) => _loadUserData(dispatch);

const _loadUserData = (dispatch) => {

  _get({
    endpoint: 'users',
    callback: (items) => {
      if (typeof items.payload !== 'undefined') {
        dispatch({
          type: LOAD_USER_DATA,
          data: items.payload.pop()
        });
      }
    }
  })

};