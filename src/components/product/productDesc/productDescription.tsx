import { ThumbsGallery } from '../../../components/product/productSlider/thumbs/thumbsSlider';
import type { Swiper as SwiperType } from 'swiper/types';
import './productDesc.scss';

function ProductDescription({
  images,
  setThumbsSwiper,
  description,
}: {
  description: string;
  images: string[];
  setThumbsSwiper: (swiper: SwiperType | null) => void;
}) {
  return (
    <div className="pr">
      <ThumbsGallery images={images} setThumbsSlider={setThumbsSwiper} />
      <p className="product-description">
        <p>{description}</p>
        <p>Shipping to Poland, the USA and the UK only.</p>
        <p>Delivery time: 5-15 business days</p>
      </p>
    </div>
  );
}

export default ProductDescription;
