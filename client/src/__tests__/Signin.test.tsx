import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { AuthContextProvider } from '@/context/AuthContext';
import { useSignin } from '@/lib/react-query/mutations';
import { axiosInstance } from '@/lib/services/axiosInstance';
import { Signin } from '@/pages/root';
import { QueryProvider } from '@/providers/QueryProvider';

vi.mock('@/lib/react-query/mutations', () => ({
  useSignin: vi.fn(),
}));

const mock = new MockAdapter(axiosInstance);

const signinResponse = {
  data: { message: 'User signed in successfully' },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

const signinUserMock = vi.fn().mockResolvedValue(signinResponse);
(useSignin as Mock).mockReturnValue({ mutateAsync: signinUserMock });

const renderer = (ui: React.ReactElement) => {
  return render(
    <Router>
      <QueryProvider>
        <AuthContextProvider>{ui}</AuthContextProvider>
      </QueryProvider>
    </Router>,
  );
};

describe('Signin Component', () => {
  beforeEach(() => {
    mock.reset();
    renderer(<Signin />);
  });

  test('renders signin form with inputs and submit button', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('shows validation errors on empty submission', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(signinUserMock).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123',
      });
      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least 8 characters/i),
      ).not.toBeInTheDocument();
    });
  });

  test('displays error message on signin failure with specific error message', async () => {
    const signinError = 'A specific error occurred';

    (signinUserMock as Mock).mockImplementationOnce(() => {
      return Promise.reject({ response: { data: { message: signinError } } });
    });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText(signinError)).toBeInTheDocument();
    });
  });

  test('displays error message on signin failure with unknown error', async () => {
    const signinError = 'An unknown error occurred';

    (signinUserMock as Mock).mockImplementationOnce(() => {
      return Promise.reject({});
    });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText(signinError)).toBeInTheDocument();
    });
  });
});
