import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../app/App';

function renderWithRouter(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App Routing', () => {

  it('clicking on logo redirects to home page', async () => {
    renderWithRouter('/about');

    const logoLink = document.getElementById('logo');
    await userEvent.click(logoLink as HTMLElement);

    expect(screen.getByText(/Ride with ReMotionX/i)).toBeInTheDocument();
  });
});
