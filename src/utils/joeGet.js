const URL = process.env.REACT_APP_JOE_RESUME_API_URL;

/**
* options:
*  endpoint
*  callback
*/

export default (options = {}) => {
  // JOE: NOTE: needs some sort of error logging

  if (typeof options.endpoint === 'undefined') {
    console.error('ERROR: You need to supply an endpoint.');
    return;
  }

  let url = URL + options.endpoint;

  fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'Content-Type: application/json'
    }
  })
  .then(response => response.json())
  .then(items => {
    if (typeof options.callback === 'function') {
      options.callback(items);
    }
  })
  .catch(error => {
    if (typeof options.error === 'function') {
      options.error(error);
    }
  });
};