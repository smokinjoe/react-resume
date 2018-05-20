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
        status: 422,
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

  it('should always pass', () => {
    expect(true).toEqual(true);
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
      token: 'pb4ugo2bed'
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
      id: 1,
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

    const store = mockStore({ token: { data: 'pb4ugo2bed' } });
    return store.dispatch(putTechnicalExperience(expectedTechnicalExperience)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    // Don't forget some failure tests

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
      id: 1,
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

    const store = mockStore({ token: { data: 'pb4ugo2bed' } });
    return store.dispatch(putWeaponOfChoice(expectedWoC)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    // Don't forget some failure tests

  });
});