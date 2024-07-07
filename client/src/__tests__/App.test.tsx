import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import App from '@/App';
import { QueryProvider } from '@/providers/QueryProvider';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('App', () => {
  const renderer = () =>
    render(
      <QueryProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryProvider>,
    );

  it('renders App without crashing', () => {
    renderer();

    const nav = screen.getByRole('navigation');

    expect(within(nav).getByText('Home')).toBeInTheDocument();
    expect(within(nav).getByText('About')).toBeInTheDocument();
    expect(within(nav).getByText('Contact')).toBeInTheDocument();
  });
});
