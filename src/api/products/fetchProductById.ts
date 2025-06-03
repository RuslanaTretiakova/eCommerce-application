import type { Product, ProductResponse } from '../../types/productTypes';

export const fetchProductById = async (id: string, token: string | null): Promise<Product> => {
  const response = await fetch(`/.netlify/functions/product?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch product');

  const data: ProductResponse = await response.json();
  const current = data.masterData.current;
  const staged = data.masterData.staged;
  const variant = current.masterVariant;
  const variants = current.variants || [];
  const description =
    staged.description?.['en-US'] ??
    current.description?.['en-US'] ??
    `Need a bike that won't let you down? No flashy gimmicks—just proven durability. Meet ${current.name['en-US']} - no-nonsense durability, built to last.`;

  const allImages: string[] = [
    ...(variant.images?.map((img) => img.url) || []),
    ...variants.flatMap((v) => v.images?.map((img) => img.url) || []),
  ];

  const price =
    variant.prices?.[0]?.value.centAmount ?? variants[0]?.prices?.[0]?.value.centAmount ?? 0;

  let discountedPrice = null;
  discountedPrice =
    variant.prices?.[0]?.discounted?.value.centAmount ??
    variants[0]?.prices?.[0]?.discounted?.value.centAmount ??
    null;

  return {
    title: current.name['en-US'],
    price: price / 100,
    discountedPrice: discountedPrice !== null ? discountedPrice / 100 : null,
    images: allImages,
    description: description,
  };
};
