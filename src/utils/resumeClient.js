import axios from 'axios';

const URL = process.env.REACT_APP_JOE_RESUME_API_URL;
const TIMEOUT_SECONDS = process.env.REACT_APP_TIMEOUT_SECONDS;

const resumeClient = {};

// JOE: WIP: I think I want to remove successCb and failCb
const _resumeClient = ({ headers, auth, method, endpoint }) => {
  
  return new Promise((resolve, reject) => {
    // dispatch(fetching());

    axios({
      method: method,
      url: buildUri(URL, endpoint),
      headers: headers,
      auth: auth
    })
    .then(items => {
      // success dispatch();
      resolve(items.data);
    })
    .catch(error => {
      // dispatch(err());
      reject();
    });
  });
};

const buildUri = (base, nextSegment) => {
  return base + nextSegment;
};

resumeClient.getResume = ({successCb, failCb}) => {
  
  _resumeClient({ 
      method: 'GET', 
      endpoint: 'resume',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      }
    })
    .then(items => {
      if (typeof successCb === 'function') {
        successCb(items);
      }
    })
    .catch(error => {
      if (typeof failCb === 'function') {
        failCb();
      }
    });

};

resumeClient.login = ({username, password, successCb, failCb}) => {
  _resumeClient({
      method: 'GET',
      endpoint: 'token',
      auth: {
        username,
        password
      }
    })
    .then(respones => {
      if (typeof successCb === 'function') {
        successCb(respones);
      }
    })
    .catch(error => {
      if (typeof failCb === 'function') {
        failCb();
      }
    });
};

export default resumeClient;
