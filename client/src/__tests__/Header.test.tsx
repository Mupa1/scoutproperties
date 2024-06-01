import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Header from '@/components/shared/Header';
import { headerNavItems } from '@/entities/header-nav-items';

describe('Header component', () => {
  test('renders navigation links', () => {
    render(<Header />);
    const navLinks = headerNavItems.map((item) => screen.getByText(item.name));
    navLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  test('renders login link', () => {
    render(<Header />);
    const loginLink = screen.getByText('Log in');
    expect(loginLink).toBeInTheDocument();
  });

  test('opens mobile menu when menu button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('closes mobile menu when close button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  test('renders Scout properties logo', () => {
    render(<Header />);
    const logo = screen.getAllByAltText('scout properties logo');
    expect(logo.length).toBeGreaterThan(0);
  });
});
