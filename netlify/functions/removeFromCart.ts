import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const { VITE_CTP_API_URL, VITE_CTP_PROJECT_KEY } = process.env;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { cartId, version, lineItemId, token } = JSON.parse(event.body || '{}');

    if (!cartId || !version || !lineItemId || !token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      };
    }

    const response = await fetch(`${VITE_CTP_API_URL}/${VITE_CTP_PROJECT_KEY}/carts/${cartId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorData.message || 'Failed to remove item' }),
      };
    }

    const updatedCart = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(updatedCart),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err }),
    };
  }
};
