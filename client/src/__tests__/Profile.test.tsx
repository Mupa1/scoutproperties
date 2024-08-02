import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { useUserContext } from '@/context/useUserContext';
import { useProfileListings } from '@/lib/react-query/queries';
import { Profile } from '@/pages/protected';
import { QueryProvider } from '@/providers/QueryProvider';

vi.mock('@/context/useUserContext');
vi.mock('@/components/shared/ListingCard', () => {
  return {
    __esModule: true,
    ListingCard: vi.fn().mockImplementation(({ data }) => (
      <div data-testid="listing-card">
        <p>{data.title}</p>
      </div>
    )),
  };
});

vi.mock('@/lib/react-query/queries', () => {
  return {
    useProfileListings: vi.fn(),
  };
});

const mockListingsData = [
  {
    id: 1,
    title: 'Listing 1',
    images: ['image1.jpg'],
    bedroom: 2,
    bathroom: 1,
    price: 1000,
    address: '123 Main St',
    latitude: 45.6,
    longitude: 9.8,
  },
  {
    id: 2,
    title: 'Listing 2',
    images: ['image2.jpg'],
    bedroom: 3,
    bathroom: 2,
    price: 2000,
    address: '456 Main St',
    latitude: 45.9,
    longitude: 8.8,
  },
];

describe('Profile', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    (useUserContext as Mock).mockReturnValue({
      currentUser: {
        company: 'johndoe',
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatar: '',
      },
    });

    (useProfileListings as Mock).mockReturnValue({
      data: mockListingsData,
      isPending: false,
      isError: false,
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <QueryProvider>
          <Profile />
        </QueryProvider>
      </MemoryRouter>,
    );

  test('renders the personal information correctly', () => {
    renderComponent();

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toHaveAttribute(
      'src',
      '/user-placeholder.svg',
    );
  });

  test('renders the "Edit Profile" link', () => {
    renderComponent();

    const editProfileLink = screen.getByText('Edit Profile');
    expect(editProfileLink).toBeInTheDocument();
    expect(editProfileLink.closest('a')).toHaveAttribute(
      'href',
      '/profile/update',
    );
  });

  test('renders the user listings correctly', async () => {
    renderComponent();

    expect(screen.getByText('My Listings')).toBeInTheDocument();

    expect(screen.getByTestId('profile-listings')).toBeInTheDocument();
  });
});
