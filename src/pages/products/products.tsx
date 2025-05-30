import { useEffect, useState } from 'react';
import getProductList from '../../api/getProductList';
import type { Product } from '@commercetools/platform-sdk';
import Load from '../load/load';

function Products() {
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
    <div className="temp">
      <h1>Products page</h1>
    </div>
  );
}

export default Products;
