import axios from 'axios';

const URL = process.env.REACT_APP_JOE_RESUME_API_URL;

/**
* options:
*   endpoint
*   callback
*/
const _authGet = (options = {}) => {
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

/**
* options:
*  endpoint
*  callback
*/

const _get = (options = {}) => {
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
  });
};

/**
* Load resume data from local json file
*/

export const GET_RESUME = 'GET_RESUME';
export const getResume = () => (dispatch) => _getResume(dispatch);

const _getResume = (dispatch) => {
  // return new Promise((resolve, reject) => {
    _loading(dispatch, FETCHING);

    _get({
      endpoint: 'resume',
      callback: (items) => {
        dispatch({
          type: GET_RESUME,
          data: items.payload
        });

        if (typeof items.payload.user !== 'undefined') {
          dispatch({
            type: GET_USER_DATA,
            data: items.payload.user.pop()
          });
        }

        _loading(dispatch, IDLE);

      }
    });

  // });



};

/**
* Load user data from API endpoint
*/

export const GET_USER_DATA = 'GET_USER_DATA';
export const getUserData = () => (dispatch) => _getUserData(dispatch);

const _getUserData = (dispatch) => {

  _authGet({
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
  _authGet({
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
  _authGet({
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
  _authGet({
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
  _authGet({
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
  _authGet({
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

/**
* Login action
*/

export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const login = (username, password) => (dispatch) => _login(dispatch, username, password);

const _login = (dispatch, username, password) => {

  axios({
    method: 'GET',
    url: URL + 'token',
    auth: {
      username: username,
      password: password
    }
  })
  .then((response) => {

    if (response.data && response.data.payload && response.data.payload.token) {
      dispatch({
        type: LOGIN,
        data: response.data.payload.token
      });
    }
    else {
      dispatch({
        type: LOGIN_ERROR
      });
    }

  });

};

/**
* Update Technical Experiences
*/

export const PUT_TECHNICAL_EXPERIENCE = 'PUT_TECHNICAL_EXPERIENCE';
export const putTechnicalExperience = (data) => (dispatch, getState) => _putTechnicalExperience(dispatch, getState, data);

const _putTechnicalExperience = (dispatch, getState, data) => {

  return new Promise((resolve, reject) => {
    let token = getState().token.data;

    axios({
      method: 'PUT',
      url: URL + 'technical_experiences/' + data.id,
      auth: {
        username: token,
        password: 'unused'
      },
      data: {
        items: data.items,
        title: data.title
      }
    })
    .then(response => {
      dispatch({
        type: PUT_TECHNICAL_EXPERIENCE,
        data: data
      });

      resolve(data);
    })
    .catch(error => {
      console.log("ERROR: ", error);

      reject();
    });

  });

};

/**
* Update Weapons of Choice
*/

export const PUT_WEAPON_OF_CHOICE = 'PUT_WEAPON_OF_CHOICE';
export const putWeaponOfChoice = (data) => (dispatch, getState) => _putWeaponOfChoice(dispatch, getState, data);

const _putWeaponOfChoice = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {

    let token = getState().token.data;

    axios({
      method: 'PUT',
      url: URL + 'weapons_of_choice/' + data.id,
      auth: {
        username: token,
        password: 'unused'
      },
      data: {
        items: data.items,
        title: data.title
      }
    })
    .then(response => {
      dispatch({
        type: PUT_WEAPON_OF_CHOICE,
        data: data
      });

      resolve(data);
    })
    .catch(error => {
      console.log("ERROR: ", error);

      reject();
    });

  });
};

/**
* Update employment experiences
*/

export const PUT_EMPLOYMENT_EXPERIENCE = 'PUT_EMPLOYMENT_EXPERIENCE';
export const POST_EMPLOYMENT_EXPERIENCE = 'POST_EMPLOYMENT_EXPERIENCE';
export const DELETE_EMPLOYMENT_EXPERIENCE = 'DELETE_EMPLOYMENT_EXPERIENCE';
export const saveEmpoymentExperience = (data) => (dispatch, getState) => _saveEmploymentExperience(dispatch, getState, data);
export const deleteEmploymentExperience = (data) => (dispatch, getState) => _deleteEmploymentExperience(dispatch, getState, data);

const _saveEmploymentExperience = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {

    let token = getState().token.data;
    let method, url, type;

    if (typeof data.id !== 'undefined') {
      method = 'PUT';
      url = URL + 'employment_experiences/' + data.id;
      type = PUT_EMPLOYMENT_EXPERIENCE;
    }
    else {
      method = 'POST';
      url = URL + 'employment_experiences';
      type = POST_EMPLOYMENT_EXPERIENCE
    }

    axios({
      method: method,
      url: url,
      auth: {
        username: token,
        password: 'unused'
      },
      data: {
        company_name: data.company_name,
        company_role: data.company_role,
        date_start: data.date_start,
        date_end: data.date_end,
        items: data.items
      }
    })
    .then(response => {
      data.id = response.data.payload.id;
      dispatch({
        type: type,
        data: data
      });

      resolve(data);
    })
    .catch(error => {
      console.log('ERROR: ', error);
      reject();
    });

  })
};

const _deleteEmploymentExperience = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {
    let token = getState().token.data;

    axios({
      method: 'DELETE',
      url: URL + 'employment_experiences/' + data.id,
      auth: {
        username: token,
        password: 'unused'
      }
    })
    .then(response => {
      dispatch({
        type: DELETE_EMPLOYMENT_EXPERIENCE,
        data: data
      });
      resolve(data);
    })
    .catch(error => {
      console.log('ERROR: ', error);
      reject();
    });

  });
};

/**
* Update School stuffs
*/

export const PUT_SCHOOL = 'PUT_SCHOOL';
export const saveSchool = (data) => (dispatch, getState) => _saveSchool(dispatch, getState, data);

const _saveSchool = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {

    let token = getState().token.data;

    axios({
      method: 'PUT',
      url: URL + 'schools/' + data.id,
      auth: {
        username: token,
        password: 'unused'
      },
      data: {
        school_name: data.school_name,
        wut: data.wut,
        date_of_graduation: data.date_of_graduation
      }
    })
    .then(response => {
      dispatch({
        type: PUT_SCHOOL,
        data: data
      });
      resolve(data);
    })
    .catch(error => {
      console.log('ERROR: ', error);
      reject();
    });

  });
};

/**
* Update Project stuffs
*/

export const PUT_PROJECT = 'PUT_PROJECT';
export const POST_PROJECT = 'POST_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const saveProject = (data) => (dispatch, getState) => _saveProject(dispatch, getState, data);
export const deleteProject = (data) => (dispatch, getState) => _deleteProject(dispatch, getState, data);

const _saveProject = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {
    let token = getState().token.data;

    let method, url, type;

    if (typeof data.id === 'undefined') {
      method = 'POST';
      url = URL + 'projects';
      type = POST_PROJECT;
    }
    else {
      method = 'PUT';
      url = URL + 'projects/' + data.id;
      type = PUT_PROJECT;
    }

    axios({
      method: method,
      url: url,
      auth: {
        username: token,
        password: 'unused'
      },
      data: {
        title: data.title,
        link_url: data.link_url,
        link_title: data.link_title
      }
    })
    .then(response => {
      data.id = response.data.payload.id;
      dispatch({
        type: type,
        data: data
      });
      resolve(data);
    })
    .catch(error => {
      console.log('ERROR: ', error);
      reject();
    });

  });
};

const _deleteProject = (dispatch, getState, data) => {
  return new Promise((resolve, reject) => {
    let token = getState().token.data;

    axios({
      method: 'DELETE',
      url: URL + 'projects/' + data.id,
      auth: {
        username: token,
        password: 'unused'
      }
    })
    .then(response => {
      dispatch({
        type: DELETE_PROJECT,
        data: data
      });
      resolve(data);
    })
    .catch(error => {
      console.log('ERROR: ', error);
      reject();
    });

  });
};

/**
* Loading actions
*/

export const IDLE = 'IDLE';
export const FETCHING = 'FETCHING';

export const fetching = () => (dispatch) => _loading(dispatch, FETCHING);
export const complete = () => (dispatch) => _loading(dispatch, IDLE);

const _loading = (dispatch, type) => {
  dispatch({ type });
};