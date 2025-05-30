import { useEffect, useState } from 'react';
import getProductList from '../../api/getProductList';
import type { Product } from '@commercetools/platform-sdk';
import Load from '../load/load';

// This is a temporary implementation that simply demonstrates how to work with the ProductCard component.
// It includes basic styling for the entire card component.
// To implement hover effects on the ProductCard, it's necessary to add the `product-list__item` class.
// This code is just a simple example, please delete it or modify it for your purposes once you begin work on the actual task.

import type { JSX } from 'react';
import BaseButton from '../../components/ui/base-button/BaseButton';
import ProductCard from '../../components/ui/product-card/ProductCard';
import type { IProductCard } from '../../types/interfaces';

import './product.scss';

const products: IProductCard[] = [
  {
    id: '1',
    name: 'Rockrider',
    description: 'Rower elektryczny górski MTB Rockrider E-ST100 27,5',
    price: '3699,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
  {
    id: '2',
    name: 'Romet',
    description: 'Rower górski ROMET Rambler R9.3',
    price: '1299,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
  {
    id: '3',
    name: 'Van Rysel',
    description: 'Rower gravelowy dziecięcy Triban GRVL500 26"',
    price: '599,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
  {
    id: '4',
    name: 'Grundig',
    description: 'Rower miejski elektryczny Doc Green by Grundig 28" 14Ah',
    price: '9699,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
  {
    id: '5',
    name: 'Elops',
    description: 'Rower miejski Elops Speed 500',
    price: '5699,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
  {
    id: '6',
    name: 'Nicebike',
    description: 'Rower Górski MTB 29 cali NICEBIKE Triad M6 amortyzacja',
    price: '1699,00',
    imageUrl: './rower-elektryczny-gorski-mtb-rockrider-e-st100-275.avif',
  },
];

console.log(products);

function Products(): JSX.Element {
  const handleAddToCart = (productId: string) => {
    console.log(`${productId}`);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProductList();
        setProducts(response.results);
        console.log(response.results);
        console.log(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="product-page temp">
      <h1>Products page</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-list__item" data-id={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
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
        ))}
      </div>
    </div>
  );
}

export default Products;
