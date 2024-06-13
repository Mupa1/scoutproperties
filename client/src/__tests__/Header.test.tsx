import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Header } from '@/components/shared/Header';
import { navItems } from '@/entities/header-nav-items';

describe('Header component', () => {
  const renderer = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

  test('renders navigation links', () => {
    renderer();
    const navLinks = navItems.map((item) => screen.getByText(item.name));
    navLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  test('renders login link', () => {
    renderer();
    const loginLink = screen.getByText('Log in');
    expect(loginLink).toBeInTheDocument();
  });

  test('opens mobile menu when menu button is clicked', async () => {
    renderer();
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    const closeButton = await screen.findByRole('button', {
      name: /close menu/i,
    });
    expect(closeButton).toBeInTheDocument();
  });

  test('closes mobile menu when close button is clicked', async () => {
    renderer();
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    const closeButton = await screen.findByRole('button', {
      name: /close menu/i,
    });
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  test('renders Scout properties logo', () => {
    renderer();
    const logo = screen.getAllByAltText('scout properties logo');
    expect(logo.length).toBeGreaterThan(0);
  });
});
