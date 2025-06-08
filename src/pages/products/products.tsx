import { useEffect, useState } from 'react';
import type { ProductData, Product } from '@commercetools/platform-sdk';
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
import SearchProduct from '../../components/searchProduct/searchProduct';
import { useParams } from 'react-router-dom';
import getSearchProductListByCategoryFromServer from '../../api/productListByCategory';
import SortButton from '../../components/ui/sort-button/sort-button';
import getSortedProductListFromServer from '../../api/getSortedProductListByCatgory';
import getSortedProductListAllFromServer from '../../api/getSortdeProductListAll';

interface ProductDataWithId extends ProductData {
  id: string;
}

function Products(): JSX.Element {
  const { category } = useParams();
  const handleAddToCart = (productId: string) => {
    console.log(`${productId}`);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let response;
        if (category === 'all') {
          response = await getProductListFromServer();
          setProducts(response.results);
        } else {
          response = await getSearchProductListByCategoryFromServer(category || '');
          setProducts(response.results);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const handleSearchResults = (results: Product[]) => {
    setProducts(results);
  };

  const handleSort = async (sortAttr: string) => {
    if (sortAttr === 'price asc' || sortAttr === 'price desc') {
      const sorted = [...products].sort((a, b) => {
        const isProductA = 'masterData' in a;
        const isProductB = 'masterData' in b;
        const aData = isProductA ? (a as Product).masterData.current : (a as ProductDataWithId);
        const bData = isProductB ? (b as Product).masterData.current : (b as ProductDataWithId);
        const priceA = aData.masterVariant.prices?.[0]?.value.centAmount || 0;
        const priceB = bData.masterVariant.prices?.[0]?.value.centAmount || 0;
        return sortAttr === 'price asc' ? priceA - priceB : priceB - priceA;
      });
      setProducts(sorted);
    } else if (category === 'all') {
      try {
        const response = await getSortedProductListAllFromServer(`masterData.current.${sortAttr}`);
        setProducts(response.results);
        console.log(products);
      } catch (error) {
        console.error('Sorting failed:', error);
      }
    } else {
      try {
        const response = await getSortedProductListFromServer(category || '', sortAttr);
        setProducts(response.results);
      } catch (error) {
        console.error('Sorting failed:', error);
      }
    }
  };

  useEffect(() => {
    console.log('Updated products state:', products);
  }, [products]);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="product-page temp">
      <SearchProduct onSearchResults={handleSearchResults} />
      <div className='sort-buttons'>
        <SortButton attrSort=" name A-Z" onClickF={() => handleSort('name.en-US asc')} />
        <SortButton attrSort=" name Z-A" onClickF={() => handleSort('name.en-US desc')} />
        <SortButton attrSort=" price ↑" onClickF={() => handleSort('price asc')} />
        <SortButton attrSort=" price ↓" onClickF={() => handleSort('price desc')} />
      </div>
     
      <div className="product-list">
        {products.map((product) => {
          const isProduct = 'masterData' in product;

          const productData = isProduct
            ? (product as Product).masterData.current
            : (product as ProductDataWithId);

          const name = productData?.name['en-US'];

          const description =
            productData?.description?.['en-US'].slice(
              0,
              productData?.description?.['en-US'].indexOf('.'),
            ) ?? '';
          const imageUrl = productData?.masterVariant?.images?.[0]?.url ?? '';

          const price = productData?.masterVariant?.prices?.[0]?.value.centAmount ?? '';

          const discount =
            productData?.masterVariant?.prices?.[0]?.discounted?.value.centAmount || '';

          return (
            <div key={product.id} className="product-list__item" data-id={product.id}>
              {discount ? (
                <ProductCard
                  id={product?.id}
                  name={name}
                  description={description}
                  price={`${String((+price / 100).toFixed(2))} EUR`}
                  imageUrl={imageUrl}
                  discount={`${String((+discount / 100).toFixed(2))} EUR`}
                />
              ) : (
                <ProductCard
                  id={product.id}
                  name={name}
                  description={description}
                  price={`${String((+price / 100).toFixed(2))} EUR`}
                  imageUrl={imageUrl}
                />
              )}

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
