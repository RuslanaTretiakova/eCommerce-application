import type { Cart } from '../../types/cartTypes';

export default async function changeProductQuantityFromServer({
  itemId,
  cartId,
  version,
  newQuantity,
  token,
}: {
  itemId: string;
  cartId: string;
  version: number;
  newQuantity: number;
  token: string;
}): Promise<Cart> {
  try {
    const response = await fetch('/.netlify/functions/changeProductQuantity', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartId,
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: itemId,
            quantity: newQuantity,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to change product quantity.');
    }

    return await response.json();
  } catch (error) {
    console.error('changeQuantityMw error:', error.message);
    throw err;
  }
}
