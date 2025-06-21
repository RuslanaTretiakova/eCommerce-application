import type { Product, Image, ProductVariant } from '../../types/productTypes';

export const fetchProductBySKU = async (sku: string, token: string | null): Promise<Product> => {
  const response = await fetch(`/.netlify/functions/productBySKU?sku=${encodeURIComponent(sku)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch product');

  const data = await response.json();
  const product = data.results?.[0];

  if (!product) {
    throw new Error('Product not found');
  }

  const allVariants = [product.masterVariant, ...(product.variants || [])];
  const variant = allVariants.find((v: ProductVariant) => v.sku === sku);

  if (!variant) throw new Error('Variant with specified SKU not found');

  const images = variant.images?.map((img: Image) => img.url) || [];
  const price = variant.prices?.[0]?.value.centAmount ?? 0;
  const discountedPrice = variant.prices?.[0]?.discounted?.value.centAmount ?? null;

  return {
    title: product.name['en-US'],
    price: price / 100,
    discountedPrice: discountedPrice !== null ? discountedPrice / 100 : null,
    images,
    description: product.description?.['en-US'],
  };
};
