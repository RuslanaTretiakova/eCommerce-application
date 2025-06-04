import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Autoplay, Keyboard, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import './productSlider.scss';

type ProductGalleryProps = {
  images: string[];
  thumbsSwiper: SwiperType | null;
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
        autoHeight
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Navigation, Autoplay, Keyboard, Zoom]}
        className="main-swiper"
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <img src={src} alt="Bike" className="product-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { ProductGallery };
