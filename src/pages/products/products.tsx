import { useEffect, useState } from 'react';
import type { ProductData, Product } from '@commercetools/platform-sdk';
import Load from '../load/load';

import { Breadcrumbs } from '../../components/ui/breadcrumbs/Breadcrumbs';

import { useNavigate } from 'react-router-dom';

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
          console.log(response.results);
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

  //to navigate to detailed product page
  const navigate = useNavigate();
  const handleCardClick = (productId: string) => {
    navigate(`/${productId}`);
  };
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
      <Breadcrumbs />
      <SearchProduct onSearchResults={handleSearchResults} />
      <div className="sort-buttons">
        <SortButton attrSort=" name A-Z" onClickF={() => handleSort('name.en-US asc')} />
        <SortButton attrSort=" name Z-A" onClickF={() => handleSort('name.en-US desc')} />
        <SortButton attrSort=" price ↑" onClickF={() => handleSort('price asc')} />
        <SortButton attrSort=" price ↓" onClickF={() => handleSort('price desc')} />
      </div>

      <div className="product-list">
        {products.map((product) => {
          const productData = 'masterData' in product ? product.masterData.current : product;
          const variants = [productData.masterVariant, ...productData.variants];

          const productName = productData.name?.['en-US'] || 'Unnamed product';
          const productDescription = productData.description?.['en-US']?.split('.')[0] || '';

          return variants.map((variant) => {
            const variantKey = variant.sku || String(variant.id);
            const price = variant.prices?.[0]?.value.centAmount ?? 0;
            const discount = variant.prices?.[0]?.discounted?.value.centAmount ?? 0;
            const imageUrl = variant.images?.[0]?.url || '';

            return (
              <div
                key={variantKey}
                className="product-list__item"
                data-id={variantKey}
                onClick={() => handleCardClick(variantKey)}
                aria-hidden="true"
              >
                <ProductCard
                  id={variantKey}
                  name={productName}
                  description={productDescription}
                  price={`${(price / 100).toFixed(2)} EUR`}
                  imageUrl={imageUrl}
                  discount={discount ? `${(discount / 100).toFixed(2)} EUR` : undefined}
                />

                <BaseButton
                  title="Add to Cart"
                  type="button"
                  className="button button--cart"
                  onClick={() => handleAddToCart(variantKey)}
                >
                  Add to Cart
                </BaseButton>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Products;
