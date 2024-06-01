import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '@/App';

describe('App', () => {
  const renderer = () =>
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

  it('renders App without crashing', () => {
    renderer();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
  });
});
