import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../src/types/constants';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const authHeader = event.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Missing or invalid token' }),
    };
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const { cartId, version, sku } = JSON.parse(event.body || '{}');

    if (!cartId || version === undefined || !sku) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const res = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'addLineItem',
            sku,
            quantity: 1,
          },
        ],
      }),
    });

    const data = await res.json();

    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};

export { handler };
