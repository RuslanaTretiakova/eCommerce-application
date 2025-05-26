import { Handler } from '@netlify/functions';
import { registerCustomer } from '../../src/api/registerCustomer';
import { responses } from '../../src/utils/errors/responses';
import { IRegistrationError } from '../../src/types/interfaces';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return responses.invalidInput();
  }

  try {
    const data = JSON.parse(event.body || '{}');

    const customer = await registerCustomer(data);

    return responses.registrationSuccess(customer.id);
  } catch (error) {
    console.error('Registration error caught:', error);

    const err = error as IRegistrationError;

    switch (err.code) {
      case 'EMAIL_EXISTS':
        console.warn('Email already exists error triggered');
        return responses.emailExists();

      default:
        console.error('Unhandled server error');
        return responses.serverError();
    }
  }
};
