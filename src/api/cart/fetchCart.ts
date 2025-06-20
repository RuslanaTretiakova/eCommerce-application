import type { Cart } from '../../types/cartTypes';

export async function fetchCart(cartId: string, token: string): Promise<Cart> {
  const res = await fetch(`/.netlify/functions/getCart?cartId=${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch cart');
  }

  return await res.json();
}
