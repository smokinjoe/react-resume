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

describe('getResume', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('performs GET_RESUME and GET_USER_DATA after successful fetching', () => {
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
        stats: 200,
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

  it('should always pass', () => {
    expect(true).toEqual(true);
  });
});