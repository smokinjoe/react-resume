import { GET_USER_DATA } from '../actions';
import { user } from './index';

describe('user reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialUserData = {
      city: 'San Francisco',
      email: 'joe.ekiert@gmail.com',
      name: 'Joe Ekiert',
      phone: '978.375.5916',
      state: null,
      street_address: null,
      website: 'http://ekiert.net',
      zip: null
    };

    expect(user(undefined, {})).toEqual(expectedInitialUserData);
  });

  it('should update user data when passed a response', () => {
    const expectedUserData = {
      city: 'Boston',
      email: 'joeekiert@gmail.com',
      name: 'Joe',
      phone: 'phone number',
      state: 'MA',
      street_address: '123 Anystreet',
      website: 'http://ekiert.net/joe-ekiert-resume.pdf',
      zip: 12345
    };

    expect(user(undefined, {
      type: GET_USER_DATA,
      data: expectedUserData
    })).toEqual(expectedUserData);
  });
});

import {
  GET_TECHNICAL_EXPERIENCES,
  PUT_TECHNICAL_EXPERIENCE,
  GET_WEAPONS_OF_CHOICE,
  PUT_WEAPON_OF_CHOICE,
  GET_EMPLOYMENT_EXPERIENCES,
  PUT_EMPLOYMENT_EXPERIENCE,
  POST_EMPLOYMENT_EXPERIENCE,
  DELETE_EMPLOYMENT_EXPERIENCE,
  GET_SCHOOLS,
  PUT_SCHOOL,
  GET_PROJECTS,
  PUT_PROJECT,
  POST_PROJECT,
  DELETE_PROJECT,
  GET_RESUME
} from '../actions';
import { resume } from './index';

describe('resume reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialResumeState = {
      technicalExperiences: [],
      weaponsOfChoice: [],
      employmentExperiences: [],
      schools: [],
      projects: []
    };

    expect(resume(undefined, {})).toEqual(expectedInitialResumeState);
  });

  describe('GET_RESUME', () => {
    it('should return entire resume object', () => {
      const expectedResumeState = {
        technicalExperiences: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        weaponsOfChoice: ['why are you so violent, joe?'],
        employmentExperiences: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        schools: ['School 1'],
        projects: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }
        ]
      };

      expect(resume(undefined, {
        type: GET_RESUME,
        data: expectedResumeState
      })).toEqual(expectedResumeState);

    });
  });
});