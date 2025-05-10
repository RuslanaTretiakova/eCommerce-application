import { render } from '@testing-library/react';
import App from '../../../app/App';
import { expect, test } from 'vitest';

test('renders Hell o heading', () => {
  const { getByText } = render(<App />);
  const heading = getByText(/hell o/i);
  expect(heading).toBeInTheDocument();
});
