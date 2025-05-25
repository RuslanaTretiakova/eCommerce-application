import type { JsonResponseBody } from '../../types/types';

export const jsonResponse = (statusCode: number, body: JsonResponseBody) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const responses = {
  invalidInput: () =>
    jsonResponse(400, {
      success: false,
      error: 'Invalid input. Please check your data and try again.',
    }),

  emailExists: () =>
    jsonResponse(409, {
      success: false,
      error: 'An account with this email already exists.',
    }),

  serverError: () =>
    jsonResponse(500, {
      success: false,
      error: 'Something went wrong during registration. Please try again later.',
    }),

  registrationSuccess: (customerId: string) =>
    jsonResponse(201, {
      success: true,
      customerId,
    }),
};
