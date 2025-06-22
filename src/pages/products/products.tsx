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
import getFilteredProducts from '../../api/getFilteredProductsByType';
import PriceRangeFilter from '../../components/ui/filter/priceRange';
import ButtonResetFilter from '../../components/ui/button-reset-filter/button-reset-filter';
import FilterCheckbox from '../../components/filterCheckbox/filterCheckbox';
import {
  optionsByBrandBikes,
  optionsByBrandHelmets,
  optionsByTypeBikes,
} from '../../types/optionsFilter';
import Pagination from '../../components/pagination/pagination';
import { useAddToCartHandler } from '../../components/cart/hooks/useAddToCartHandler';
import RemoveFromCartButton from '../../components/ui/remove-button/RemoveFromCartButton';

interface ProductDataWithId extends ProductData {
  id: string;
}

function Products(): JSX.Element {
  const { category } = useParams();
  const { handleAddToCart, isProductInCart, handleRemoveFromCart } = useAddToCartHandler();

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  let limit = 6;

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

  const navigate = useNavigate();
  const handleCardClick = (productId: string) => {
    navigate(`/products/${category}/${productId}`);
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

  const handleFilterByBrand = async (selectedBrands: string[]) => {
    const filterIsActive = selectedBrands.length > 0;
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
      const productsObj = await getProductListFromServer();
      let newVisibleProducts: Product[] = [];

      productsObj.results.filter((product: Product) => {
        const masterAttributes = product.masterData.current.masterVariant.attributes ?? [];

        const hasBrandInMaster = selectedBrands.includes(masterAttributes?.[0].value.toUpperCase());

        const hasBrandInVariants = selectedBrands.includes(
          masterAttributes?.[0].value.toUpperCase(),
        );

        if (hasBrandInMaster || hasBrandInVariants) {
          newVisibleProducts.push(product);
        }

        return hasBrandInMaster || hasBrandInVariants;
      });

      setProducts(newVisibleProducts);
      setVisibleProducts(newVisibleProducts);
    } catch (error) {
      console.error('Error filtering by brand:', error);
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

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const allVariantsWithProductData = visibleProducts.flatMap((product) => {
    const productData = 'masterData' in product ? product.masterData.current : product;
    const variants = [productData.masterVariant, ...productData.variants];

    return variants.map((variant) => ({
      variant,
      productName: productData.name?.['en-US'] || 'Unnamed product',
      productDescription: productData.description?.['en-US']?.split('.')[0] || '',
    }));
  });

  const paginatedVariants = allVariantsWithProductData.slice(startIndex, endIndex);

  useEffect(() => {
    console.log('Updated products state:', products);
  }, [products]);

  useEffect(() => {
    console.log('Updated products state:', visibleProducts);
  }, [visibleProducts]);

  useEffect(() => {
    console.log('Updated products page:', page);
  }, [page]);

  if (loading) {
    return <Load />;
  }

  return (
    <div className="product-page temp">
      <Breadcrumbs />
      <SearchProduct onSearchResults={handleSearchResults} />
      <div className="filter_container">
        {category === 'b73e6212-590c-4dda-9f74-afc8bfc40529' && (
          <>
            <FilterCheckbox
              name="Type Bikes"
              optionsCheckbox={optionsByTypeBikes}
              onChange={handleFilterChange}
            />
            <FilterCheckbox
              name="Brand Bikes"
              optionsCheckbox={optionsByBrandBikes}
              onChange={handleFilterByBrand}
            />
          </>
        )}
        {category === '3ef0177d-a71d-4c42-98d9-2343d5890f87' && (
          <FilterCheckbox
            name="Brand Helmets"
            optionsCheckbox={optionsByBrandHelmets}
            onChange={handleFilterByBrand}
          />
        )}

        {category === 'all' && (
          <>
            <FilterCheckbox
              name="Type Bikes"
              optionsCheckbox={optionsByTypeBikes}
              onChange={handleFilterChange}
            />
            <FilterCheckbox
              name="Brand Bikes"
              optionsCheckbox={optionsByBrandBikes}
              onChange={handleFilterByBrand}
            />
            <FilterCheckbox
              name="Brand Helmets"
              optionsCheckbox={optionsByBrandHelmets}
              onChange={handleFilterByBrand}
            />
          </>
        )}
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
        {paginatedVariants.map(({ variant, productName, productDescription }) => {
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
                title={isProductInCart(variantKey) ? 'Already in Cart' : 'Add to Cart'}
                type="button"
                className="button button--cart"
                disabled={isProductInCart(variantKey)}
                onClick={(e) => handleAddToCart(e, variantKey)}
              >
                {isProductInCart(variantKey) ? 'Already in Cart' : 'Add to Cart'}
              </BaseButton>
              {isProductInCart(variantKey) && (
                <RemoveFromCartButton onClick={(e) => handleRemoveFromCart(e, variantKey)} />
              )}
            </div>
          );
        })}
      </div>

      <Pagination
        arrayItems={allVariantsWithProductData}
        limit={limit}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Products;
