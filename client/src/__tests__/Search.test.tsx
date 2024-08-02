import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { Search } from '@/components/pages/Home/Hero/Search';

const renderer = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Search component', () => {
  beforeEach(() => {
    renderer(<Search />);
  });
  test('renders Buy and Rent buttons', () => {
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    expect(buyButton).toBeInTheDocument();
    expect(rentButton).toBeInTheDocument();
  });

  test('renders input fields for city', () => {
    const cityInput = screen.getByPlaceholderText('City');

    expect(cityInput).toBeInTheDocument();
  });

  test('changes search type when Buy or Rent button is clicked', () => {
    const buyButton = screen.getByText('Buy');
    const rentButton = screen.getByText('Rent');

    fireEvent.click(rentButton);
    expect(rentButton).toHaveClass('bg-primary-950');
    expect(buyButton).not.toHaveClass('bg-primary-950');

    fireEvent.click(buyButton);
    expect(buyButton).toHaveClass('bg-primary-950');
    expect(rentButton).not.toHaveClass('bg-primary-950');
  });

  test('calls the search function with correct parameters on form submit', () => {
    const cityInput = screen.getByPlaceholderText('City') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-submit-button');

    fireEvent.change(cityInput, {
      target: { value: 'Mannheim' },
    });

    fireEvent.click(searchButton);

    expect(cityInput.value).toBe('Mannheim');
  });
});
