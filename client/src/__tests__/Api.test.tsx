import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { signinUser, signOut, signupUser } from '@/lib/services/api';
import { axiosInstance } from '@/lib/services/axiosInstance';
import { NewUser } from '@/types';

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axiosInstance);
});

afterEach(() => {
  mock.restore();
  vi.restoreAllMocks();
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  throw reason;
});

describe('API requests', () => {
  test('should sign up a user successfully', async () => {
    const newUser: NewUser = {
      name: 'testuser',
      company: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
    };
    const mockResponse = { message: 'User registered successfully!' };

    mock.onPost('/auth/register').reply(200, mockResponse);

    const response = await signupUser(newUser);
    expect(response.data).toEqual(mockResponse);
  });

  test('should handle signup user error', async () => {
    const newUser: NewUser = {
      name: 'testuser',
      company: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
    };
    const mockError = { message: 'Failed to register user! Please try again!' };

    mock.onPost('/auth/register').reply(400, mockError);

    await expect(signupUser(newUser)).rejects.toThrow(
      'Request failed with status code 400',
    );
  });

  test('should sign in a user successfully', async () => {
    const credentials = { email: 'testuser@example.com', password: 'password' };
    const mockResponse = { message: 'User signed in successfully!' };

    mock.onPost('/auth/login').reply(200, mockResponse);

    const response = await signinUser(credentials);
    expect(response.data).toEqual(mockResponse);
  });

  test('should handle signin user error', async () => {
    const credentials = { email: 'testuser@example.com', password: 'password' };
    const mockError = { message: 'User sign in failed' };

    mock.onPost('/auth/login').reply(401, mockError);

    await expect(signinUser(credentials)).rejects.toThrow(
      'Request failed with status code 401',
    );
  });

  test('should sign out a user successfully', async () => {
    const mockResponse = { message: 'User signed out successfully' };

    mock.onPost('/auth/logout').reply(200, mockResponse);

    const response = await signOut();
    expect(response.data).toEqual(mockResponse);
  });
});
