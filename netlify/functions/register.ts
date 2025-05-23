import { Handler } from '@netlify/functions';
import { registerCustomer } from '../../src/api/registerCustomer';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const customer = await registerCustomer(data);

    console.log('Registration successful:', customer);

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        customerId: customer.id,
      }),
    };
  } catch (error: unknown) {
    console.error('Registration failed:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: 'Registration failed. Please try again later.',
      }),
    };
  }
};
