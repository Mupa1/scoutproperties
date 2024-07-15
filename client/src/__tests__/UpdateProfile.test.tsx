import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from 'vitest';

import { failureToast } from '@/components/ui';
import { useUserContext } from '@/context/useUserContext';
import { useUpdateUser } from '@/lib/react-query/mutations';
import { UpdateProfile } from '@/pages/protected';
import { QueryProvider } from '@/providers/QueryProvider';
import { UploadWidgetProps } from '@/types';

vi.mock('@/context/useUserContext');
vi.mock('@/lib/react-query/mutations');
vi.mock('@/components/ui', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, string>;
  return {
    ...actual,
    successToast: vi.fn(),
    failureToast: vi.fn(),
  };
});
vi.mock('@/components/shared/UploadWidget', () => ({
  __esModule: true,
  default: ({ setAvatar }: UploadWidgetProps) => (
    <button onClick={() => setAvatar('http://example.com/image.jpg')}>
      Change Photo
    </button>
  ),
}));

describe('UpdateProfile', () => {
  const mockUpdateUser = vi.fn();
  const mockUpdateUserContext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useUserContext as Mock).mockReturnValue({
      currentUser: {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        avatar: '',
      },
      updateUser: mockUpdateUserContext,
    });

    (useUpdateUser as Mock).mockReturnValue({
      mutateAsync: mockUpdateUser,
      isPending: false,
    });
  });

  const renderer = () =>
    render(
      <Router>
        <QueryProvider>
          <UpdateProfile />
        </QueryProvider>
      </Router>,
    );

  test('renders the UpdateProfile component correctly', () => {
    renderer();

    expect(
      screen.getByRole('heading', { name: /update profile/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('renders the UploadWidget component', () => {
    renderer();

    expect(screen.getByText('Change Photo')).toBeInTheDocument();
  });

  test('calls handleUpdate on form submission', async () => {
    renderer();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe Updated' },
    });
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'johndoeupdated' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'johndoeupdated@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByText('Change Photo'));

    fireEvent.submit(screen.getByRole('button', { name: /update profile/i }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        id: '1',
        user: {
          name: 'John Doe Updated',
          username: 'johndoeupdated',
          email: 'johndoeupdated@example.com',
          password: 'newpassword',
          avatar: 'http://example.com/image.jpg',
        },
      });
    });
  });

  test('displays error messages when validation fails', async () => {
    renderer();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /update profile/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  test('handles upload widget error correctly', async () => {
    (useUpdateUser as Mock).mockReturnValue({
      mutateAsync: vi.fn().mockRejectedValue({
        response: {
          data: {
            message: 'Failed to update profile.',
          },
        },
      }),
      isPending: false,
    });

    renderer();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe Updated' },
    });
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'johndoeupdated' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'johndoeupdated@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByText('Change Photo'));

    fireEvent.submit(screen.getByRole('button', { name: /update profile/i }));

    await waitFor(() => {
      expect(failureToast).toHaveBeenCalledWith('Failed to update profile.');
      expect(screen.getByText('Failed to update profile.')).toBeInTheDocument();
    });
  });
});
