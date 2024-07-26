import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { SearchFilter } from '@/components/pages/Listings/SearchFilter';
import { QueryProvider } from '@/providers/QueryProvider';

const mockOnSubmit = vi.fn();

describe('SearchFilter Component', () => {
  const renderer = () =>
    render(
      <QueryProvider>
        <SearchFilter onSubmit={mockOnSubmit} />
      </QueryProvider>,
    );

  test('renders all input fields and button', () => {
    renderer();

    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByTestId('search-filter-type')).toBeInTheDocument();
    expect(screen.getByTestId('search-filter-property')).toBeInTheDocument();
    expect(screen.getByTestId('search-filter-minPrice')).toBeInTheDocument();
    expect(screen.getByTestId('search-filter-maxPrice')).toBeInTheDocument();
    expect(screen.getByTestId('search-filter-bedroom')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-filter-submit-button'),
    ).toBeInTheDocument();
  });

  test('updates city state on input change', () => {
    renderer();
    const cityInput = screen.getByPlaceholderText('City') as HTMLInputElement;

    fireEvent.change(cityInput, { target: { value: 'Mannheim' } });
    expect(cityInput.value).toBe('Mannheim');
  });

  test('updates minPrice state on input change', () => {
    renderer();
    const minPriceInput = screen.getByTestId(
      'search-filter-minPrice',
    ) as HTMLInputElement;

    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    expect(minPriceInput.value).toBe('1000');
  });

  test('updates maxPrice state on input change', () => {
    renderer();
    const maxPriceInput = screen.getByTestId(
      'search-filter-maxPrice',
    ) as HTMLInputElement;

    fireEvent.change(maxPriceInput, { target: { value: '5000' } });
    expect(maxPriceInput.value).toBe('5000');
  });

  test('updates bedroom state on input change', () => {
    renderer();
    const bedroomInput = screen.getByTestId(
      'search-filter-bedroom',
    ) as HTMLInputElement;

    fireEvent.change(bedroomInput, { target: { value: '3' } });
    expect(bedroomInput.value).toBe('3');
  });

  test('toggles filter visibility when clicking filter button', () => {
    renderer();
    const filterButton = screen.getByRole('button', { name: /filters/i });

    fireEvent.click(filterButton);
    expect(screen.getByRole('form')).toHaveClass('block');

    fireEvent.click(filterButton);
    expect(screen.getByRole('form')).toHaveClass('hidden');
  });
});
