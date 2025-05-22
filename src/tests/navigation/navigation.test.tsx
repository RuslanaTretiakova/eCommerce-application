import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('renders HomePage on /', () => {
    renderWithRouter('/');
    expect(screen.getByText(/Ride with ReMotionX/i)).toBeInTheDocument();
  });

  it('renders Products page on /products', () => {
    renderWithRouter('/products');
    expect(screen.getByText(/Products page/i)).toBeInTheDocument();
  });

  it('renders About page on /about', () => {
    renderWithRouter('/about');
    expect(screen.getByText(/About us page/i)).toBeInTheDocument();
  });

  it('renders Login page on /login', () => {
    renderWithRouter('/login');
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  it('renders Registration page on /registration', () => {
    renderWithRouter('/registration');
    expect(screen.getByText(/Registration/i)).toBeInTheDocument(); // Adjust
  });

  it('renders Cart page on /cart', () => {
    renderWithRouter('/cart');
    expect(screen.getByText(/Cart page/i)).toBeInTheDocument();
  });

  it('renders ProfileAccess page on /profile-access-block', () => {
    renderWithRouter('/profile-access-block');
    expect(screen.getByText(/Time to ride!/i)).toBeInTheDocument();
  });
});
