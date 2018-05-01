jest.mock('../mocks/joeGet');

import {
  GET_RESUME,
  getResume
} from './index';

describe('Resume actions', () => {
  const resume = {
    technicalExperiences: [],
    weaponsOfChoice: [],
    employmentExperiences: [],
    schools: [],
    projects: []
  };

  it('getResume should return a promise', () => {
    // const expectedAction = new Promise((res, rej) => {});
    // expect(getResume()).toEqual(expectedAction);

    expect.assertions(1);
    // expect(getResume()).toEqual(resume);
    return getResume().then(data => expect(data.payload).toEqual(resume));
  });

});