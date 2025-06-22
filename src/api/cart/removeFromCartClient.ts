import type { Cart } from '../../types/cartTypes';

export async function removeFromCartClient({
  cartId,
  version,
  lineItemId,
  token,
}: {
  cartId: string;
  version: number;
  lineItemId: string;
  token: string;
}): Promise<Cart> {
  const response = await fetch('/.netlify/functions/removeFromCart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, version, lineItemId, token }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to remove item from cart');
  }

  return await response.json();
}
