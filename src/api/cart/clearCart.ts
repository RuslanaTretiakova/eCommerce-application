import type { Cart } from '../../types/cartTypes';

export async function clearCart(cartId: string, token: string): Promise<Cart> {
  const res = await fetch(`/.netlify/functions/cleanCart?cartId=${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to clear cart');
  }

  return await res.json();
}
