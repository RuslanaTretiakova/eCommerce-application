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
import FilterByType from '../../components/ui/filter/filterByType';
import getFilteredProducts from '../../api/getFilteredProductsByType';
import PriceRangeFilter from '../../components/ui/filter/priceRange';
import ButtonResetFilter from '../../components/ui/button-reset-filter/button-reset-filter';

interface ProductDataWithId extends ProductData {
  id: string;
}

function Products(): JSX.Element {
  const { category } = useParams();
  const handleAddToCart = (productId: string) => {
    console.log(`${productId}`);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let response;
        if (category === 'all') {
          response = await getProductListFromServer();
          setProducts(response.results);
          setVisibleProducts(response.results);
        } else {
          response = await getSearchProductListByCategoryFromServer(category || '');
          setProducts(response.results);
          setVisibleProducts(response.results);
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
    setVisibleProducts(results);
  };

  const handleSort = async (sortAttr: string) => {
    const isPriceSort = sortAttr === 'price asc' || sortAttr === 'price desc';
    const isNameSort = sortAttr.startsWith('name');

    if (visibleProducts.length <= 1 && (isPriceSort || (isFilterActive && isNameSort))) {
      setVisibleProducts([...visibleProducts]);
      return;
    }

    if (isPriceSort || (isFilterActive && isNameSort)) {
      const sorted = [...visibleProducts].sort((a, b) => {
        const getData = (product: Product | ProductDataWithId) =>
          'masterData' in product ? product.masterData.current : product;

        const aData = getData(a);
        const bData = getData(b);

        if (isPriceSort) {
          const priceA = aData.masterVariant.prices?.[0]?.value.centAmount || 0;
          const priceB = bData.masterVariant.prices?.[0]?.value.centAmount || 0;
          return sortAttr === 'price asc' ? priceA - priceB : priceB - priceA;
        }

        const nameA = aData.name?.['en-US']?.toLowerCase() || '';
        const nameB = bData.name?.['en-US']?.toLowerCase() || '';
        return sortAttr.endsWith('asc') ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });

      setVisibleProducts(sorted);
      return;
    }

    try {
      let response;
      if (category === 'all') {
        response = await getSortedProductListAllFromServer(`masterData.current.${sortAttr}`);
      } else {
        response = await getSortedProductListFromServer(category || '', sortAttr);
      }

      setProducts(response.results);
      setVisibleProducts(response.results);
    } catch (error) {
      console.error('Sorting failed:', error);
    }
  };

  const handleSortButtonClick = (sortKey: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const allButtons = document.querySelectorAll('.sort-button');
    allButtons.forEach((btn) => btn.classList.remove('sort-button_clicked'));

    const target = e.target as HTMLButtonElement;
    target.classList.add('sort-button_clicked');

    handleSort(sortKey);
  };

  const handleFilterChange = async (selectedCategories: string[]) => {
    const filterIsActive = selectedCategories.length > 0;
    setIsFilterActive(filterIsActive);

    if (!filterIsActive) {
      const fallback =
        category === 'all'
          ? await getProductListFromServer()
          : await getSearchProductListByCategoryFromServer(category || '');
      setProducts(fallback.results);
      setVisibleProducts(fallback.results);
      return;
    }

    try {
      const filtered = await getFilteredProducts(selectedCategories);
      setProducts(filtered.results);
      setVisibleProducts(filtered.results);
    } catch (error) {
      console.error('Filtering error:', error);
    }
  };

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    const range = { min: min ?? undefined, max: max ?? undefined };

    const filtered = products.filter((prod: Product) => {
      const productData = 'masterData' in prod ? prod.masterData.current : prod;

      const masterVariant = productData.masterVariant;
      const otherVariants = productData.variants;

      const masterPriceCents = masterVariant.prices?.[0]?.value.centAmount ?? 0;
      const masterPriceEuros = masterPriceCents / 100;

      const masterInRange =
        (range.min === undefined || masterPriceEuros >= range.min) &&
        (range.max === undefined || masterPriceEuros <= range.max);

      if (!masterInRange) return false;

      const variants = [masterVariant, ...otherVariants];
      const anyVariantInRange = variants.some((variant) => {
        const priceCents = variant.prices?.[0]?.value.centAmount ?? 0;
        const priceEuros = priceCents / 100;
        return (
          (range.min === undefined || priceEuros >= range.min) &&
          (range.max === undefined || priceEuros <= range.max)
        );
      });

      return anyVariantInRange;
    });

    setVisibleProducts(filtered);
  };

  const handleResetFilter = async () => {
    setIsFilterActive(false);

    setLoading(true);
    try {
      let response;
      if (category === 'all') {
        response = await getProductListFromServer();
      } else {
        response = await getSearchProductListByCategoryFromServer(category || '');
      }
      setProducts(response.results);
      setVisibleProducts(response.results);
    } catch (error) {
      console.error('Failed to reset filters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Updated products state:', products);
  }, [products]);

  useEffect(() => {
    console.log('Updated products state:', visibleProducts);
  }, [visibleProducts]);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="product-page temp">
      <Breadcrumbs />
      <SearchProduct onSearchResults={handleSearchResults} />
      <div className="filter_container">
        <FilterByType onChange={handleFilterChange} />
        <PriceRangeFilter onChange={handlePriceRangeChange} />
        <ButtonResetFilter onClick={handleResetFilter} />
      </div>
      <div className="sort-buttons">
        <SortButton
          attrSort=" name A-Z"
          onClickF={(e) => handleSortButtonClick('name.en-US asc', e)}
        />
        <SortButton
          attrSort=" name Z-A"
          onClickF={(e) => handleSortButtonClick('name.en-US desc', e)}
        />
        <SortButton attrSort=" price ↑" onClickF={(e) => handleSortButtonClick('price asc', e)} />
        <SortButton attrSort=" price ↓" onClickF={(e) => handleSortButtonClick('price desc', e)} />
      </div>

      <div className="product-list">
        {visibleProducts.map((product) => {
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
