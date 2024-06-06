import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Search from '@/components/pages/Home/Search';

describe('Search component', () => {
  test('renders Buy and Rent buttons', () => {
    render(<Search />);
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    expect(buyButton).toBeInTheDocument();
    expect(rentButton).toBeInTheDocument();
  });

  test('renders input fields for location, min price, and max price', () => {
    render(<Search />);
    const locationInput = screen.getByPlaceholderText('City');
    const minPriceInput = screen.getByPlaceholderText('Min Price');
    const maxPriceInput = screen.getByPlaceholderText('Max Price');

    expect(locationInput).toBeInTheDocument();
    expect(minPriceInput).toBeInTheDocument();
    expect(maxPriceInput).toBeInTheDocument();
  });

  test('changes search type when Buy or Rent button is clicked', () => {
    render(<Search />);
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    fireEvent.click(rentButton);
    expect(rentButton).toHaveClass('bg-secondary-500');
    expect(buyButton).not.toHaveClass('bg-secondary-500');

    fireEvent.click(buyButton);
    expect(buyButton).toHaveClass('bg-secondary-500');
    expect(rentButton).not.toHaveClass('bg-secondary-500');
  });

  test('calls the search function with correct parameters on form submit', () => {
    render(<Search />);
    const locationInput = screen.getByPlaceholderText(
      'City',
    ) as HTMLInputElement;
    const minPriceInput = screen.getByPlaceholderText(
      'Min Price',
    ) as HTMLInputElement;
    const maxPriceInput = screen.getByPlaceholderText(
      'Max Price',
    ) as HTMLInputElement;
    const searchButton = screen.getByTestId('search-submit-button');

    fireEvent.change(locationInput, {
      target: { value: 'Mannheim' },
    });
    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, {
      target: { value: '5000' },
    });

    fireEvent.click(searchButton);

    expect(locationInput.value).toBe('Mannheim');
    expect(minPriceInput.value).toBe('1000');
    expect(maxPriceInput.value).toBe('5000');
  });
});
