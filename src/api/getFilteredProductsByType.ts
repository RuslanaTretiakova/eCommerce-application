async function getFilteredProducts(categories: string[]) {
  const query = categories.map((c) => `category=${encodeURIComponent(c)}`).join('&');
  const response = await fetch(`/.netlify/functions/filterProducts?${query}`);
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return await response.json();
}

export default getFilteredProducts;
