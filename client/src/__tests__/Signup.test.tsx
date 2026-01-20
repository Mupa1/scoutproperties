import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { AuthContextProvider } from '@/context/AuthContext';
import { useSignup } from '@/lib/react-query/mutations';
import { axiosInstance } from '@/lib/services/axiosInstance';
import { Signup } from '@/pages/root';
import { QueryProvider } from '@/providers/QueryProvider';

vi.mock('@/lib/react-query/mutations', () => ({
  useSignup: vi.fn(),
}));

const mock = new MockAdapter(axiosInstance);

const signupResponse: AxiosResponse = {
  data: { message: 'User created successfully' },
  status: 201,
  statusText: 'Created',
  headers: new axios.AxiosHeaders(),
  config: {
    headers: new axios.AxiosHeaders(),
  },
};

const signupUserMock = vi.fn().mockResolvedValue(signupResponse);
(useSignup as Mock).mockReturnValue({ mutateAsync: signupUserMock });

const renderer = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <QueryProvider>
        <AuthContextProvider>{ui}</AuthContextProvider>
      </QueryProvider>
    </MemoryRouter>,
  );
};

describe('Signup Component', () => {
  beforeEach(() => {
    mock.reset();
    renderer(<Signup />);
  });

  test('renders signup form with inputs and submit button', () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  test('shows validation errors on empty submission', async () => {
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(
        screen.getAllByText(/company must be at least 2 characters/i)[0],
      ).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  test('submits form with valid data and makes API call', async () => {
    const nameInput = screen.getByLabelText('Name');
    const companyInput = screen.getByLabelText('Company');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(companyInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(signupUserMock).toHaveBeenCalledWith({
        name: 'John Doe',
        company: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(
        screen.queryByText(/company must be at least 2 characters/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/email is invalid/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least 8 characters/i),
      ).not.toBeInTheDocument();
    });
  });

  test('displays error message on signup failure with specific error message', async () => {
    const signupError = 'A specific error occurred';

    (signupUserMock as Mock).mockImplementationOnce(() => {
      return Promise.reject({ response: { data: { message: signupError } } });
    });

    const nameInput = screen.getByLabelText('Name');
    const companyInput = screen.getByLabelText('Company');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(companyInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(signupError)).toBeInTheDocument();
    });
  });

  test('displays error message on signup failure with unknown error', async () => {
    const signupError = 'An unknown error occurred';

    (signupUserMock as Mock).mockImplementationOnce(() => {
      return Promise.reject({});
    });

    const nameInput = screen.getByLabelText('Name');
    const companyInput = screen.getByLabelText('Company');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(companyInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(signupError)).toBeInTheDocument();
    });
  });
});
