import { render, screen } from '@testing-library/react';
import { it } from 'vitest';

import { Heading } from './index';

it('should render Heading with text Hello Vite', () => {
  render(<Heading>Hello Vite</Heading>);

  const heading = screen.getByRole('heading', {
    name: /Hello Vite/,
  });

  expect(heading).toBeInTheDocument();

  screen.debug();
});
