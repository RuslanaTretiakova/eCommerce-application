export const getRegistrationErrorMessage = (status: number, fallbackMessage?: string): string => {
  switch (status) {
    case 400:
      return 'Invalid input. Please check your data and try again.';
    case 409:
      return 'An account with this email already exists.';
    case 500:
      return 'Something went wrong during registration. Please try again later.';
    default:
      return fallbackMessage || 'Unknown error occurred.';
  }
};
