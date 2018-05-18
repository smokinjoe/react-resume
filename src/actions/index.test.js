jest.mock('../mocks/joeGet');

import {
  GET_RESUME,
  getResume
} from './index';

// getResume

describe('Resume actions', () => {
  const resume = {
    technicalExperiences: [],
    weaponsOfChoice: [],
    employmentExperiences: [],
    schools: [],
    projects: []
  };

  // struggling with this https://facebook.github.io/jest/docs/en/tutorial-async.html
  it('getResume should return a promise', () => {
    expect.assertions(1);
    return getResume().then(data => {
      expect(data.payload).toEqual(resume)
    });
  });

});

// idle
// fetching
// err

describe();