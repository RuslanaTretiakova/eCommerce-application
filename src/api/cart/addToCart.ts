export const addToCart = async (
  token: string,
  cartId: string,
  cartVersion: number,
  sku: string,
) => {
  const res = await fetch(`/.netlify/functions/addToCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cartId,
      version: cartVersion,
      sku,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || 'Failed to add to cart');
  }

  return res.json();
};
