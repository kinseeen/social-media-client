import { jest, describe, it, expect } from '@jest/globals';
import { logout } from './logout.js';

const mockLocalStorage = {
  removeItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

describe('logout', () => {
  it('Should log out the user, and clear the token.', async () => {
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
