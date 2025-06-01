import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../api/authorithation/AuthToken';
import type { Product, ProductResponse } from '../../types/productTypes';

import ProductHeader from '../../components/product/productHeader/productHeader';
import ProductDescription from '../../components/product/productDesc/productDescription';
// import ProductSpecification from '../../components/product/productSpec/productSpecification';
import BaseButton from '../../components/ui/base-button/BaseButton';
import { ProductGallery } from '../../components/product/productSlider/mainPic/productSlider';
import type { Swiper as SwiperType } from 'swiper/types';

import './product.scss';

// const id = 'e507a429-1b68-455f-bf26-ea1d81da4bf3'; - one photo
// const id = '18c819ea-a29d-497e-817e-b2dfc9e4ad72'; - 6 photos



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
          staged.description?.en ??
          `Need a bike that won't let you down? No flashy gimmicks—just proven durability. Meet ${current.name.en} - no-nonsense durability, built to last.`;

        const allImages: string[] = [
          ...(variant.images?.map((img) => img.url) || []),
          ...variants.flatMap((v) => v.images?.map((img) => img.url) || []),
        ];

        const price =
          variant.prices?.[0]?.value.centAmount ?? variants[0]?.prices?.[0]?.value.centAmount ?? 0;

        const productInfo: Product = {
          title: current.name.en,
          price: price / 100,
          images: allImages,
          description: description,
        };

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

        <ProductHeader title={product.title} price={product.price} discount={0} />
        <ProductDescription
          images={product.images}
          setThumbsSwiper={setThumbsSwiper}
          description={product.description}
        />
        {/* <ItemSpecification specs={[{ frame: 'Al' }, { weight: '15.5kg' }]} /> */}
        <BaseButton type="button" className="button--submit" title="title">
          Add to cart
        </BaseButton>
      </div>
    );
  }
}

export default Item;
