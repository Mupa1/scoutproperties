import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '@/App';

describe('App', () => {
  const renderer = () => render(<App />);

  it('renders App without crashing', () => {
    renderer();
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
