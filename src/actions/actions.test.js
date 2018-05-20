import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
  GET_RESUME,
  GET_USER_DATA,
  FETCHING,
  IDLE,
  ERROR,
  getResume
} from './index';

const MOCK_TOKEN = 'pb4ugo2bed';

describe('getResume()', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('performs FETCHING, GET_RESUME, GET_USER_DATA, and IDLE in a complete fetch', () => {
    const data = {
      technicalExperiences: ['hi'],
      weaponsOfChoice: ['hi'],
      employmentExperiences: ['hi'],
      schools: ['hi'],
      projects: ['hi'],
      user: [{
        city: 'Boston',
        email: 'email',
        name: 'Joe',
        phone: 'phone number',
        state: 'state',
        street_address: '123 anystreet',
        website: 'http://poop.bike/',
        zip: 12345
      }]
    };

    const items = {
      payload: data
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: items
      });
    });

    const expectedActions = [
      { type: FETCHING },
      { type: GET_RESUME, data: data },
      { type: GET_USER_DATA, data: data.user[0] },
      { type: IDLE }
    ];

    const store = mockStore({ user: {}, resume: {} });

    return store.dispatch(getResume()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  // JOE: I want to say that the .catch is causing something weird.
  // the dispatch(err()) should be happening, but it isn't .. ?
  xit('calls ERROR if the fetch fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          error: 'You done failed'
        }
      });
    });

    const expectedActions = [
      { type: ERROR }
    ];

    const store = mockStore({});

    return store.dispatch(getResume()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

import {
  login,
  LOGIN,
  LOGIN_ERROR
} from './index';

describe('login()', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fire LOGIN if successful', () => {
    const data = {
      token: MOCK_TOKEN
    };

    const response = {
      payload: data
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: LOGIN, data: data.token }
    ];

    const store = mockStore({});
    return store.dispatch(login('name','pass')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

import {
  PUT_TECHNICAL_EXPERIENCE,
  putTechnicalExperience
} from './index';

describe('putTechnicalExperience()', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fire PUT_TECHNICAL_EXPERIENCE if successful', () => {
    const expectedTechnicalExperience = {
      title: 'title1',
      items: [1, 2, 3]
    };

    const response = {
      payload: expectedTechnicalExperience
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: PUT_TECHNICAL_EXPERIENCE, data: expectedTechnicalExperience }
    ];

    const store = mockStore({ token: { data: MOCK_TOKEN } });
    return store.dispatch(putTechnicalExperience(expectedTechnicalExperience)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    // JOE: NOTE: Don't forget some failure tests

  });

});

import {
  PUT_WEAPON_OF_CHOICE,
  putWeaponOfChoice
} from './index';

describe('putWeaponOfChoice', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fire PUT_WEAPON_OF_CHOICE if successful', () => {
    const expectedWoC = {
      title: 'title1',
      items: [1, 2, 3]
    };

    const response = {
      payload: expectedWoC
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: PUT_WEAPON_OF_CHOICE, data: expectedWoC }
    ];

    const store = mockStore({ token: { data: MOCK_TOKEN } });
    return store.dispatch(putWeaponOfChoice(expectedWoC)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    // JOE: NOTE: Don't forget some failure tests

  });
});

import {
  PUT_EMPLOYMENT_EXPERIENCE,
  POST_EMPLOYMENT_EXPERIENCE,
  DELETE_EMPLOYMENT_EXPERIENCE,
  saveEmploymentExperience,
  deleteEmploymentExperience
} from './index';

describe('Employment Experience fun fun fun', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('saveEmploymentExperience', () => {

    it('should fire POST_EMPLOYMENT_EXPERIENCE if no id is present', () => {

      const employmentExperience = {
        company_name: 'company name',
        company_role: 'company role',
        date_start: 'date start',
        date_end: 'date end',
        items: [1, 2, 3]
      };

      const id = 7;

      const expectedEmploymentExperience = Object.assign({},
            employmentExperience,
            { id: 7 });

      const response = {
        payload: expectedEmploymentExperience
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response
        });
      });

      const expectedActions = [
        { type: POST_EMPLOYMENT_EXPERIENCE, data: expectedEmploymentExperience }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(saveEmploymentExperience(employmentExperience)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      // JOE: NOTE: Don't forget some failure tests

    });

    it('should fire PUT_EMPLOYMENT_EXPERIENCE if id is present', () => {

      const expectedEmploymentExperience = {
        id: 7,
        company_name: 'company name',
        company_role: 'company role',
        date_start: 'date start',
        date_end: 'date end',
        items: [1, 2, 3]
      };

      const response = {
        payload: expectedEmploymentExperience
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response
        });
      });

      const expectedActions = [
        { type: PUT_EMPLOYMENT_EXPERIENCE, data: expectedEmploymentExperience }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(saveEmploymentExperience(expectedEmploymentExperience)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      // JOE: NOTE: Don't forget some failure tests

    });

  });

  describe('deleteEmploymentExperience', () => {
    it('should fire off a DELETE_EMPLOYMENT_EXPERIENCE if successful!', () => {
      const expectedObject = {
        id: 2,
        foo: 'bar'
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });

      const expectedActions = [
        { type: DELETE_EMPLOYMENT_EXPERIENCE, data: expectedObject }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(deleteEmploymentExperience(expectedObject)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });

  });

});

import {
  PUT_SCHOOL,
  saveSchool
} from './index';

describe('saveSchool', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fire PUT_SCHOOL when successful', (done) => {
    const expectedSchool = {
      id: 7,
      school_name: 'school name',
      wut: 'lol',
      date_of_graduation: 'sometime in 2005'
    };

    const response = {
      payload: expectedSchool
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response
      });
    });

    const expectedActions = [
      { type: PUT_SCHOOL, data: expectedSchool }
    ];

    const store = mockStore({ token: { data: MOCK_TOKEN } });

    return store.dispatch(saveSchool(expectedSchool)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

  });
});

import {
  PUT_PROJECT,
  POST_PROJECT,
  DELETE_PROJECT,
  saveProject,
  deleteProject
} from './index';

describe('PROJECT FUN!', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('saveProject', () => {

    it('should fire POST_PROJECT if no id is present', () => {

      const project = {
        title: 'neato',
        link_url: 'http://lipsum.com',
        link_title: 'Lorem ipsum dolor sit amet'
      };

      const id = 7;

      const expectedProject = Object.assign({},
            project,
            { id: 7 });

      const response = {
        payload: expectedProject
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response
        });
      });

      const expectedActions = [
        { type: POST_PROJECT, data: expectedProject }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(saveProject(project)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      // JOE: NOTE: Don't forget some failure tests

    });

    it('should fire PUT_PROJECT if id is present', () => {

      const expectedProject = {
        id: 7,
        title: 'neato',
        link_url: 'http://lipsum.com',
        link_title: 'Lorem ipsum dolor sit amet'
      };

      const response = {
        payload: expectedProject
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response
        });
      });

      const expectedActions = [
        { type: PUT_PROJECT, data: expectedProject }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(saveProject(expectedProject)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

      // JOE: NOTE: Don't forget some failure tests

    });

  });

  describe('deleteProject', () => {
    it('should fire off a DELETE_PROJECT if successful!', (done) => {
      const expectedProject = {
        id: 7,
        title: 'neato',
        link_url: 'http://lipsum.com',
        link_title: 'Lorem ipsum dolor sit amet'
      };


      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });

      const expectedActions = [
        { type: DELETE_PROJECT, data: expectedProject }
      ];

      const store = mockStore({ token: { data: MOCK_TOKEN } });

      return store.dispatch(deleteProject(expectedProject)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

    });

  });

});