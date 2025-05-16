import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RegistrationPage from '../../pages/registration-page/ui/RegistrationPage';

describe('RegistrationPage', () => {
  it('renders registration image', () => {
    render(<RegistrationPage />);
    const image = screen.getByAltText(/register illustration/i);
    expect(image).toBeInTheDocument();
  });

  it('renders registration form', () => {
    render(<RegistrationPage />);
    const formTitle = screen.getByText(/register/i);
    expect(formTitle).toBeInTheDocument();
  });
});
