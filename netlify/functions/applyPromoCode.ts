import type { Handler } from '@netlify/functions';
import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';
import { modifyCart } from './modifyCart';

const handler: Handler = async (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  const token = authHeader?.split(' ')[1];
  const cartId = event.queryStringParameters?.cartId;

  if (!token || !cartId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing token or cartId' }),
    };
  }

  const { promoCode } = JSON.parse(event.body || '{}');
  if (!promoCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing promoCode' }),
    };
  }
  console.log(promoCode);

  // Get cart to retrieve current version
  const res = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: await res.text(),
    };
  }

  const cart = await res.json();

  const actions = [
    {
      action: 'addDiscountCode',
      code: promoCode,
    },
  ];

  console.log(promoCode);

  return await modifyCart({ token, cartId, version: cart.version, actions });
};

export { handler };
