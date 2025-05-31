import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import '../mainPic/productSlider.scss'

type ThumbsProps = {
  images: string[];
  setThumbsSlider: (swiper: SwiperType | null) => void;
};

function ThumbsGallery({ images, setThumbsSlider }: ThumbsProps) {
  if (!images) return null;

  return (
    <Swiper
      onSwiper={setThumbsSlider}
      spaceBetween={10}
      slidesPerView={4}
      watchSlidesProgress
      modules={[Thumbs]}
      className="thumbs-swiper"
    >
      {images.map((src) => (
        <SwiperSlide key={src}>
          <img src={src} alt="Bike" className="thumbs-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { ThumbsGallery };
