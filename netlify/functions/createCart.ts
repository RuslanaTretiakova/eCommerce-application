import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

type CreateCartRequest = {
  accessToken: string;
  isAnonymous: boolean;
  anonymousId?: string;
};

type CreateCartBody = {
  currency: string;
  country: string;
  anonymousId?: string;
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body: CreateCartRequest = JSON.parse(event.body || '{}');
    console.log('Received cart create request:', body);

    if (!body.accessToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Missing access token' }),
      };
    }

    const cartData: CreateCartBody = {
      currency: 'EUR',
      country: 'PL',
    };

    if (body.isAnonymous) {
      cartData.anonymousId = body.anonymousId;
      console.log('Using anonymousId:', cartData.anonymousId);
    }

    const cartRes = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    const cart = await cartRes.json();
    console.log('Cart created:', cart);

    return {
      statusCode: cartRes.status,
      body: JSON.stringify(cart),
    };
  } catch (error) {
    const err = error as Error;
    console.error('Failed to create cart:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create cart', details: err.message }),
    };
  }
};

export { handler };
