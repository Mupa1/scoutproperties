import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ListingsPage } from '@/pages/root/Listings';
import { QueryProvider } from '@/providers/QueryProvider';

describe('Listings', () => {
  const renderer = () =>
    render(
      <QueryProvider>
        <MemoryRouter initialEntries={['/listings']}>
          <ListingsPage />
        </MemoryRouter>
      </QueryProvider>,
    );

  it('renders listings page without crashing', () => {
    renderer();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('Min Price')).toBeInTheDocument();
    expect(screen.getByText('Max Price')).toBeInTheDocument();
    expect(screen.getByText('Bedroom(s)')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-filter-submit-button'),
    ).toBeInTheDocument();
  });
});
