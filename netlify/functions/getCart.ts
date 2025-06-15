import type { Handler } from '@netlify/functions';

import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

// const CART_ID = 'c5deb8b8-5910-4c9e-837b-519a8fd506ef';

const handler: Handler = async (event) => {
  try {
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authorization header missing' }),
      };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Bearer token missing' }),
      };
    }

    const cartId = event.queryStringParameters?.cartId;
    if (!cartId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Cart ID is required' }),
      };
    }

    const res = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const cartData = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
      },
      body: JSON.stringify(cartData),
    };
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) errorMessage = error.message;
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };
