import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Header } from '@/components/shared/Header';
import { navItems } from '@/entities/nav-items';
import { QueryProvider } from '@/providers/QueryProvider';

describe('Header component', () => {
  const renderer = () =>
    render(
      <QueryProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </QueryProvider>,
    );

  test('renders navigation links', () => {
    renderer();
    const navLinks = navItems.map((item) => screen.getByText(item.name));
    navLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
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

  test('renders navigation links in mobile menu', async () => {
    renderer();
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    await waitFor(() => {
      const mobileNavLinks = screen
        .getAllByRole('link')
        .filter((link) => link.className.includes('sm-nav-links'));
      mobileNavLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  test('navigation links in mobile menu navigate correctly', async () => {
    renderer();
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    const firstNavItem = navItems[0];
    const firstNavLink = screen
      .getAllByRole('link')
      .filter((link) => link.className.includes('sm-nav-links'))
      .find((link) => link.textContent === firstNavItem.name);
    if (firstNavLink) {
      fireEvent.click(firstNavLink);
      await waitFor(() => {
        expect(window.location.pathname).toBe(firstNavItem.href);
      });
    } else {
      throw new Error('First nav link not found in mobile menu');
    }
  });

  test('header hides on scroll down and shows on scroll up', async () => {
    renderer();
    const header = screen.getByRole('banner');
    
    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });
    fireEvent.scroll(window);
    
    // Wait for framer-motion animation to apply
    await waitFor(
      () => {
        const style = window.getComputedStyle(header);
        const transform = style.transform;
        // framer-motion applies transform as translateY(-100px) when hidden
        expect(transform).toMatch(/translateY\(-100px\)/);
      },
      { timeout: 1000 },
    );
    
    // Simulate scrolling back up
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    fireEvent.scroll(window);
    
    // Wait for header to show again
    await waitFor(
      () => {
        const style = window.getComputedStyle(header);
        const transform = style.transform;
        // When shown, transform should be none or translateY(0px)
        expect(transform).toMatch(/(none|translateY\(0px\))/);
      },
      { timeout: 1000 },
    );
  });
});
