import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ListingsPage from '@/pages/root/Listings';

describe('Listings', () => {
  const renderer = () =>
    render(
      <MemoryRouter initialEntries={['/listings']}>
        <ListingsPage />
      </MemoryRouter>,
    );

  it('renders listings page without crashing', () => {
    renderer();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bedroom(s)')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-filter-submit-button'),
    ).toBeInTheDocument();
  });
});
