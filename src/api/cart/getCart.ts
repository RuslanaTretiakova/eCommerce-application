export const getCartById = async (token: string, cartId: string) => {
  try {
    const response = await fetch(`/.netlify/functions/getCart?cartId=${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('getCartById error:', error);
    return null;
  }
};
