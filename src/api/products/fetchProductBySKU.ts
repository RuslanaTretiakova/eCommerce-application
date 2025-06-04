import type { Product, ProductResponse } from '../../types/productTypes';

export const fetchProductBySKU = async (sku: string, token: string | null): Promise<Product> => {
  debugger;
  const response = await fetch(`/.netlify/functions/productBySKU?sku=${sku}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch product');

  const data: { results: ProductResponse[] } = await response.json();
  const productData = data.results?.[0];

  if (!productData) {
    throw new Error('Product not found');
  }

  const allVariants = [productData.masterVariant, ...(productData.variants ?? [])];
  const variant = allVariants.find((v) => v.sku === sku);

  if (!variant) {
    throw new Error('Variant with given SKU not found');
  }

  const description =
    productData.description?.['en-US'] ??
    `Need a bike that won't let you down? Meet ${productData.name['en-US']}`;

  const allImages: string[] = variant.images?.map((img) => img.url) || [];

  const price = variant.prices?.[0]?.value.centAmount ?? 0;
  const discountedPrice = variant.prices?.[0]?.discounted?.value.centAmount ?? null;

  return {
    title: productData.name['en-US'],
    price: price / 100,
    discountedPrice: discountedPrice !== null ? discountedPrice / 100 : null,
    images: allImages,
    description,
  };
};
