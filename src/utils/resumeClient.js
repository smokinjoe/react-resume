import axios from 'axios';

const URL = process.env.REACT_APP_JOE_RESUME_API_URL;
const TIMEOUT_SECONDS = process.env.REACT_APP_TIMEOUT_SECONDS;

const resumeClient = {};

// JOE: WIP: I think I want to remove successCb and failCb
const _resumeClient = (params) => {
  const options = _buildOpts(params);

  return new Promise((resolve, reject) => {
    axios(options)
    .then(items => {
      resolve(items.data);
    })
    .catch(error => {
      reject();
    });
  });
};

const _isDef = (a) => typeof a !== 'undefined';

const _buildUri = (base, nextSegment) => {
  return base + nextSegment;
};

const _buildOpts = ({ headers, auth, method, endpoint }) => {
  const _opts = {};

  if (_isDef(headers)) {
    _opts.headers = headers;
  }
  if (_isDef(auth)) {
    _opts.auth = auth;
  }
  if (_isDef(method)) {
    _opts.method = method;
  }
  if (_isDef(endpoint)) {
    _opts.url = _buildUri(URL, endpoint);
  }

  return _opts;
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
