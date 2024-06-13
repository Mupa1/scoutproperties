import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { About } from '@/pages/root';

describe('About', () => {
  const renderer = () =>
    render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

  it('renders About without crashing', () => {
    renderer();

    const heading = screen.getByText('The No.1 in Real Estate Properties.');
    expect(heading).toBeInTheDocument();
  });
});
