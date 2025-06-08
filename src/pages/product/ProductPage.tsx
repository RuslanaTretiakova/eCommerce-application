import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../api/authorithation/AuthToken';
import type { Product } from '../../types/productTypes';
import { fetchProductById } from '../../api/products/fetchProductBySKU';

import ProductHeader from '../../components/product/productHeader/productHeader';
import ProductDescription from '../../components/product/productDesc/productDescription';
// import ProductSpecification from '../../components/product/productSpec/productSpec';
import BaseButton from '../../components/ui/base-button/BaseButton';
import { ProductGallery } from '../../components/product/productSlider/mainPic/productSlider';

import type { Swiper as SwiperType } from 'swiper/types';

import './product.scss';

function Item() {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchProduct = async () => {
      try {
        const productInfo = await fetchProductById(id, token);
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
  if (error || !product) {
    console.log(error);
  }

  if (product) {
    return (
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
        <BaseButton type="button" className="button--submit" title="title">
          Add to cart
        </BaseButton>
      </div>
    );
  }
}

export default Item;
