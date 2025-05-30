import { ThumbsGallery } from '../../../components/product/productSlider/thumbs/thumbsSlider';
import type { Swiper as SwiperType } from 'swiper/types';

function ProductDescription({
  description,
  images,
  setThumbsSwiper,
}: {
  description: string;
  images: string[];
  setThumbsSwiper: (swiper: SwiperType | null) => void;
}) {
  return (
    <div className="product-description">
      <p>{description}</p>
      <ThumbsGallery images={images} setThumbsSlider={setThumbsSwiper} />
    </div>
  );
}

export default ProductDescription;
