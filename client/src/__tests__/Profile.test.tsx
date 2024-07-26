import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { ListingCard } from '@/components/pages/Listings/ListingCard';
import { useUserContext } from '@/context/useUserContext';
import { listingsData } from '@/lib/dummy-data';
import { Profile } from '@/pages/protected';

vi.mock('@/context/useUserContext');
vi.mock('@/components/pages/Listings/ListingCard');

describe('Profile', () => {
  beforeEach(() => {
    (useUserContext as Mock).mockReturnValue({
      currentUser: {
        company: 'johndoe',
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatar: '',
      },
    });

    (ListingCard as Mock).mockImplementation(({ data }) => (
      <div data-testid="listing-card">
        <p>{data.title}</p>
      </div>
    ));
  });

  const renderComponent = () =>
    render(
      <Router>
        <Profile />
      </Router>,
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

  test('renders the user listings correctly', () => {
    renderComponent();

    expect(screen.getByText('My Listings')).toBeInTheDocument();
    expect(screen.getAllByTestId('listing-card')).toHaveLength(
      listingsData.length,
    );

    listingsData.forEach((listing) => {
      expect(screen.getByText(listing.title)).toBeInTheDocument();
    });
  });
});
