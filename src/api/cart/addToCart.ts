import type { Cart } from '../../types/cartTypes';

export async function addToCart(
  token: string,
  cartId: string,
  version: number,
  sku: string,
): Promise<Cart> {
  const res = await fetch('/.netlify/functions/addToCart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, version, sku }),
  });

  if (!res.ok) {
    throw new Error('Failed to add to cart');
  }

  return await res.json();
}
