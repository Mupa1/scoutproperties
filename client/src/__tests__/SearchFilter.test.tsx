import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SearchFilter from '@/components/pages/Listings/SearchFilter';

describe('SearchFilter Component', () => {
  test('renders all input fields and button', () => {
    render(<SearchFilter />);

    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bedroom(s)')).toBeInTheDocument();
    expect(
      screen.getByTestId('search-filter-submit-button'),
    ).toBeInTheDocument();
  });

  test('updates location state on input change', () => {
    render(<SearchFilter />);
    const locationInput = screen.getByPlaceholderText(
      'City',
    ) as HTMLInputElement;

    fireEvent.change(locationInput, { target: { value: 'Mannheim' } });
    expect(locationInput.value).toBe('Mannheim');
  });

  test('updates minPrice state on input change', () => {
    render(<SearchFilter />);
    const minPriceInput = screen.getByTestId(
      'search-filter-minPrice',
    ) as HTMLInputElement;

    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    expect(minPriceInput.value).toBe('1000');
  });

  test('updates maxPrice state on input change', () => {
    render(<SearchFilter />);
    const maxPriceInput = screen.getByTestId(
      'search-filter-maxPrice',
    ) as HTMLInputElement;

    fireEvent.change(maxPriceInput, { target: { value: '5000' } });
    expect(maxPriceInput.value).toBe('5000');
  });

  test('updates bedrooms state on input change', () => {
    render(<SearchFilter />);
    const bedroomsInput = screen.getByTestId(
      'search-filter-bedrooms',
    ) as HTMLInputElement;

    fireEvent.change(bedroomsInput, { target: { value: '3' } });
    expect(bedroomsInput.value).toBe('3');
  });
});
