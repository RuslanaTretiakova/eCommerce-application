import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../api/authorithation/AuthToken';
import type { Product } from '../../types/productTypes';
import { fetchProductBySKU } from '../../api/products/fetchProductBySKU';

import ProductHeader from '../../components/product/productHeader/productHeader';
import ProductDescription from '../../components/product/productDesc/productDescription';
// import ProductSpecification from '../../components/product/productSpec/productSpec';
import BaseButton from '../../components/ui/base-button/BaseButton';
import { ProductGallery } from '../../components/product/productSlider/mainPic/productSlider';
import { Breadcrumbs } from '../../components/ui/breadcrumbs/Breadcrumbs';

import type { Swiper as SwiperType } from 'swiper/types';
import { useAddToCartHandler } from '../../components/cart/hooks/useAddToCartHandler';

import './product.scss';

function Item() {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const { handleAddToCart, isProductInCart, handleRemoveFromCart } = useAddToCartHandler();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchProduct = async () => {
      try {
        const productInfo = await fetchProductBySKU(id, token);
        console.log('Product fetched:', productInfo);
        setProduct(productInfo);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }
  if (!product) {
    console.log('No product found');
  }

  if (product) {
    const sku = product.sku ?? '';

    return (
      <div>
        <Breadcrumbs />
        <div className="product">
          <div className="product-slider">
            <ProductGallery images={product.images} thumbsSwiper={thumbsSwiper} />
          </div>

          <ProductHeader
            title={product.title}
            price={product.price}
            discountedPrice={product.discountedPrice ?? null}
          />
          <ProductDescription
            images={product.images}
            setThumbsSwiper={setThumbsSwiper}
            description={product.description ?? ''}
          />
          {/* <ProductSpecification specs={[{ frame: 'Al' }, { weight: '15.5kg' }]} /> */}
          <div className={`button-group ${isProductInCart(sku) ? 'dual' : 'single'}`}>
            <BaseButton
              type="button"
              className="button button--cart"
              title={isProductInCart(sku) ? 'Already in Cart' : 'Add to Cart'}
              disabled={isProductInCart(sku)}
              onClick={(e) => handleAddToCart(e, sku)}
            >
              {isProductInCart(sku) ? 'Already in Cart' : 'Add to Cart'}
            </BaseButton>

            {isProductInCart(sku) && (
              <BaseButton
                type="button"
                className="button--remove"
                title="Remove from Cart"
                onClick={(e) => handleRemoveFromCart(e, sku)}
              >
                Remove from Cart
              </BaseButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Item;
