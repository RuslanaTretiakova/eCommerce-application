import type { IRegistrationError } from '../types/interfaces';

export const fetchCustomerToken = async (email: string, password: string): Promise<string> => {
  const response = await fetch('/.netlify/functions/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    const message =
      typeof data?.error_description === 'string'
        ? data.error_description
        : 'Authorization failed. Please try again later.';
    throw new Error(message) as IRegistrationError;
  }
  return data.access_token;
};
