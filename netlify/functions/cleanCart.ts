import type { Handler } from '@netlify/functions';
import { CartItem } from '../../src/types/cartTypes';
import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

const handler: Handler = async (e) => {
  const authHeader = e.headers.authorization || e.headers.Authorization;
  const token = authHeader?.split(' ')[1];
  const cartId = e.queryStringParameters?.cartId;

  if (!token || !cartId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missed token or cart id' }),
    };
  }

  const cartResponse = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!cartResponse.ok) {
    return {
      statusCode: cartResponse.status,
      body: await cartResponse.text(),
    };
  }

  const cartData = await cartResponse.json();
  const version = cartData.version;
  const lineItems = cartData.lineItems;

  const actions = lineItems.map((item: CartItem) => ({
    action: 'removeLineItem',
    lineItemId: item.id,
    quantity: item.quantity,
  }));

  if (actions.length === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cart already empty' }),
    };
  }

  //Might be replaced by created separately netlify function
  const updateCartResponse = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ version, actions }),
  });

  const updatedCart = await updateCartResponse.json();
  return {
    statusCode: updateCartResponse.status,
    body: JSON.stringify(updatedCart),
  };
};

export { handler };
