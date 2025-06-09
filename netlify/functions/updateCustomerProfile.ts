import { Handler } from '@netlify/functions';
import fetch from 'cross-fetch';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../src/types/constants';

export const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No request body provided' }),
    };
  }

  const { customerId, version, actions } = JSON.parse(event.body);

  if (!customerId || version === undefined || !Array.isArray(actions)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields: customerId, version, actions[]' }),
    };
  }

  const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${customerId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: event.headers.authorization || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Failed to update customer', error }),
      };
    }

    const updatedCustomer = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(updatedCustomer),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error during customer update',
        error: (error as Error).message,
      }),
    };
  }
};
