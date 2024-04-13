import { login } from './login.js';
import { apiPath } from '../constants.js';
import { save } from '../../storage/index.js';
import { jest, describe, it, expect } from '@jest/globals';

const mockLocalStorage = {
  setItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

const userProfile = {
  email: 'exampleEmail@Noroff.no',
  name: 'Max',
  avatar: 'someUrlToAvatar',
};

const accessToken = 'thisIsTheAccesstoken';

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    ...userProfile,
    accessToken: accessToken,
  }),
});

global.fetch = mockFetchSuccess;

describe('login', () => {
  it('Should log in user and store a token in localStorage when provided with valid credentials', async () => {
    var loginResponse = await login('exampleEmail@Noroff.no', '****');
    // Testing that token is being stored to local storage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify(accessToken),
    );
    //Testing that the response is equal to the defined user profile.
    expect(loginResponse).toEqual(userProfile);
  });
});
