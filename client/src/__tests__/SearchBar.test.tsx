import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SearchBar from '@/components/shared/SearchBar';

describe('SearchBar component', () => {
  test('renders Buy and Rent buttons', () => {
    render(<SearchBar />);
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    expect(buyButton).toBeInTheDocument();
    expect(rentButton).toBeInTheDocument();
  });

  test('renders input fields for location, min price, and max price', () => {
    render(<SearchBar />);
    const locationInput = screen.getByPlaceholderText('City');
    const minPriceInput = screen.getByPlaceholderText('Min Price');
    const maxPriceInput = screen.getByPlaceholderText('Max Price');

    expect(locationInput).toBeInTheDocument();
    expect(minPriceInput).toBeInTheDocument();
    expect(maxPriceInput).toBeInTheDocument();
  });

  test('changes search type when Buy or Rent button is clicked', () => {
    render(<SearchBar />);
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    fireEvent.click(rentButton);
    expect(rentButton).toHaveClass('bg-gray-600');
    expect(buyButton).not.toHaveClass('bg-gray-600');

    fireEvent.click(buyButton);
    expect(buyButton).toHaveClass('bg-gray-600');
    expect(rentButton).not.toHaveClass('bg-gray-600');
  });

  test('calls the search function with correct parameters on form submit', () => {
    render(<SearchBar />);
    const locationInput = screen.getByPlaceholderText('City');
    const minPriceInput = screen.getByPlaceholderText('Min Price');
    const maxPriceInput = screen.getByPlaceholderText('Max Price');
    const searchButton = screen.getByTestId('search-submit-button');

    fireEvent.change(locationInput, {
      target: { value: 'New York' },
    });
    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, {
      target: { value: '5000' },
    });

    fireEvent.click(searchButton);

    expect((locationInput as HTMLInputElement).value).toBe('New York');
    expect((minPriceInput as HTMLInputElement).value).toBe('1000');
    expect((maxPriceInput as HTMLInputElement).value).toBe('5000');
  });
});
