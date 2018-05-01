const URL = process.env.REACT_APP_JOE_RESUME_API_URL;
const TIMEOUT_SECONDS = process.env.REACT_APP_TIMEOUT_SECONDS;

/**
* options:
*   endpoint
*   callback
*/
export default (options = {}) => {
  // JOE: NOTE: needs some sort of error logging

  const API_URI = '?api_key=' + process.env.REACT_APP_JOE_RESUME_API_PUBLIC;

  if (typeof options.endpoint === 'undefined') {
    console.error('ERROR: You need to supply an endpoint.');
    return;
  }

  let url = URL + options.endpoint + API_URI;

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
