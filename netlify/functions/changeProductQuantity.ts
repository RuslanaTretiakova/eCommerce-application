import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import checkIsAnonumToken from './utils/checkTokenForCart';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../src/types/constants';

const handler: Handler = async (event) => {
  try {
    const token = event.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Missing token' }),
      };
    }

    const { cartId, version, actions } = JSON.parse(event.body || '{}');

    const endpointPrefix = await checkIsAnonumToken(token);

    const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}${endpointPrefix}/${cartId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ version, actions }),
    });

    const data = await response.json();
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
