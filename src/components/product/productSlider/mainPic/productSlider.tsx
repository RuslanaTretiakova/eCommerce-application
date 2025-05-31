import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import './productSlider.scss';

type ProductGalleryProps = {
  images: string[];
  thumbsSwiper: SwiperType | null;
  // setThumbsSwiper: (swiper: SwiperType | null) => void;
};

function ProductGallery({ images, thumbsSwiper }: ProductGalleryProps) {
  return (
    <div className="product-gallery">
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': '#000',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs]}
        className="main-swiper"
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img src={src} alt="Bike" className="product-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
        className="thumbs-swiper"
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img src={src} alt={`Thumb ${src + 1}`} className="thumb-image" />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}

export { ProductGallery };
