import { act, renderHook } from '@testing-library/react-hooks';
import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, test } from 'vitest';

import { axiosInstance } from '@/lib/services/axiosInstance';
import { QueryProvider } from '@/providers/QueryProvider';

import { useSignin, useSignout, useSignup } from '../lib/react-query/mutations';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryProvider>{children}</QueryProvider>
);

describe('Mutation hooks', () => {
  const mock = new MockAdapter(axiosInstance);

  afterEach(() => {
    mock.reset();
  });

  test('useSignup hook should successfully sign up a user', async () => {
    const mockResponse = { message: 'User registered successfully' };
    mock.onPost('/auth/register').reply(200, mockResponse);

    const { result, waitFor } = renderHook(() => useSignup(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        name: 'John Doe',
        company: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.data).toEqual(mockResponse);
  });

  test('useSignup hook should handle errors', async () => {
    const mockError = { message: 'User registration failed' };
    mock.onPost('/auth/register').reply(400, mockError);

    const { result, waitFor } = renderHook(() => useSignup(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          name: 'John Doe',
          company: 'johndoe',
          email: 'john@example.com',
          password: 'password123',
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.data).toEqual(mockError);
      }
    });

    await waitFor(() => result.current.isError);
  });

  test('useSignin hook should successfully sign in a user', async () => {
    const mockResponse = { message: 'User signed in successfully' };
    mock.onPost('/auth/login').reply(200, mockResponse);

    const { result, waitFor } = renderHook(() => useSignin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.data).toEqual(mockResponse);
  });

  test('useSignin hook should handle errors', async () => {
    const mockError = { message: 'User sign in failed' };
    mock.onPost('/auth/login').reply(401, mockError);

    const { result, waitFor } = renderHook(() => useSignin(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({
          email: 'john@example.com',
          password: 'password123',
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.data).toEqual(mockError);
      }
    });

    await waitFor(() => result.current.isError);
  });

  test('useSignout hook should successfully sign out a user', async () => {
    const mockResponse = { message: 'User signed out successfully' };
    mock.onPost('/auth/logout').reply(200, mockResponse);

    const { result, waitFor } = renderHook(() => useSignout(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.data).toEqual(mockResponse);
  });

  test('useSignout hook should handle errors', async () => {
    const mockError = { message: 'User sign out failed' };
    mock.onPost('/auth/logout').reply(400, mockError);

    const { result, waitFor } = renderHook(() => useSignout(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch (error) {
        const axiosError = error as AxiosError;
        expect(axiosError.response?.data).toEqual(mockError);
      }
    });

    await waitFor(() => result.current.isError);
  });
});
