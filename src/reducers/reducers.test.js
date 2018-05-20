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
});