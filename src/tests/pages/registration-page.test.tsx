import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from '../../pages/registration-page/ui/RegistrationPage';

vi.mock('../../../components/forms/DynamicForm.tsx', () => ({
  default: ({ title, submitText }: { title: string; submitText: string }) => (
    <div>
      <h1>{title}</h1>
      <button type="submit">{submitText}</button>
    </div>
  ),
}));

describe('RegistrationPage', () => {
  const renderWithRouter = () =>
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>,
    );

  it('renders registration image', () => {
    renderWithRouter();
    const image = screen.getByAltText(/register illustration/i);
    expect(image).toBeInTheDocument();
  });

  it('renders registration form title', () => {
    renderWithRouter();
    const formTitle = screen.getByText(/registration/i);
    expect(formTitle).toBeInTheDocument();
  });

  it('renders login link', () => {
    renderWithRouter();
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('renders submit button with "Sign Up" by default', () => {
    renderWithRouter();
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    expect(submitButton).toBeInTheDocument();
  });
});
