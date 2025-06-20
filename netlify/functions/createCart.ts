import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';
import type { Cart } from '../../src/types/cartTypes';

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

type CartQueryResponse = {
  results: Cart[];
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

    const headers = {
      Authorization: `Bearer ${body.accessToken}`,
      'Content-Type': 'application/json',
    };

    if (body.isAnonymous && body.anonymousId) {
      const existingCartRes = await fetch(
        `${CTP_API_URL}/${CTP_PROJECT_KEY}/carts?limit=1&where=anonymousId="${body.anonymousId}"`,
        { headers },
      );

      const existingCartData = (await existingCartRes.json()) as CartQueryResponse;

      if (existingCartRes.ok && existingCartData.results?.length > 0) {
        console.log('Existing cart found for anonymousId:', body.anonymousId);
        return {
          statusCode: 200,
          body: JSON.stringify(existingCartData.results[0]),
        };
      }
    }

    const cartData: CreateCartBody = {
      currency: 'EUR',
      country: 'PL',
    };

    if (body.isAnonymous && body.anonymousId) {
      cartData.anonymousId = body.anonymousId;
      console.log('Creating new cart with anonymousId:', cartData.anonymousId);
    }

    const cartRes = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cartData),
    });

    const cart = await cartRes.json();

    if (!cartRes.ok) {
      console.error('Cart creation failed:', cart);
      return {
        statusCode: cartRes.status,
        body: JSON.stringify({ error: 'Cart creation failed', details: cart }),
      };
    }

    console.log('Cart created:', cart);

    return {
      statusCode: 200,
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
