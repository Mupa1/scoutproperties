import { MemoryRouter, useNavigate } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { NoMatch } from '@/pages/NoMatch';
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NoMatch Component', () => {
  const mockedUseNavigate = vi.mocked(useNavigate);

  beforeEach(() => {
    // @ts-expect-error: Ignore TypeScript error
    mockedUseNavigate.mockReturnValue(vi.fn());
  });

  const renderer = () =>
    render(
      <MemoryRouter>
        <NoMatch />
      </MemoryRouter>,
    );

  test('renders NoMatch component with appropriate text', () => {
    renderer();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, we couldn’t find the page you’re looking for.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /homepage/i })).toBeInTheDocument();
  });

  test('navigates back when "Go back" button is clicked', () => {
    const mockNavigate = vi.fn();
    mockedUseNavigate.mockReturnValue(mockNavigate);

    renderer();

    const goBackButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('navigates to homepage when "Homepage" link is clicked', () => {
    renderer();

    const homepageLink = screen.getByRole('link', { name: /homepage/i });

    expect(homepageLink).toHaveAttribute('href', '/');
  });
});
