import { useEffect, useState } from 'react';
import type { Product } from '@commercetools/platform-sdk';
import Load from '../load/load';

// This is a temporary implementation that simply demonstrates how to work with the ProductCard component.
// It includes basic styling for the entire card component.
// To implement hover effects on the ProductCard, it's necessary to add the `product-list__item` class.
// This code is just a simple example, please delete it or modify it for your purposes once you begin work on the actual task.

import type { JSX } from 'react';
import BaseButton from '../../components/ui/base-button/BaseButton';
import ProductCard from '../../components/ui/product-card/ProductCard';
import './product.scss';
import getProductListFromServer from '../../api/getProductListFromServer';

function Products(): JSX.Element {
  const handleAddToCart = (productId: string) => {
    console.log(`${productId}`);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductListFromServer();
        setProducts(response.results);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Updated products state:', products);
  }, [products]);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="product-page temp">
      <h1>Products page</h1>
      <div className="product-list">
        {products.map((product) => {
          console.log(product);

          const name = String(product.masterData.current.name['en-US']);
          console.log(name);
          const description =
            product?.masterData?.current?.description?.['en-US'].slice(
              0,
              product?.masterData?.current?.description?.['en-US'].indexOf('.'),
            ) ?? '';
          const imageUrl = product?.masterData?.current?.masterVariant?.images?.[0]?.url ?? '';
          return (
            <div key={product.id} className="product-list__item" data-id={product.id}>
              <ProductCard
                id={product.id}
                name={name}
                description={description}
                price="0"
                imageUrl={imageUrl}
              />
              <BaseButton
                title="Add to Cart"
                type="button"
                className="button button--cart"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </BaseButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
