import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';

import { Modal } from '../../../ui/modal/productModal/galleryModal';

import 'swiper/swiper-bundle.css';
import './productSlider.scss';

type ProductGalleryProps = {
  images: string[];
  thumbsSwiper: SwiperType | null;
};

function ProductGallery({ images, thumbsSwiper }: ProductGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const openModal = (index: number) => {
    setModalStartIndex(index);
    setIsModalOpen(true);
  };

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
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        autoHeight={false}
        loop
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs, Navigation, Keyboard]}
        className="main-swiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={src}>
            <button type="button" onClick={() => openModal(index)} className="product-button">
              <img src={src} alt={`Bike ${index}`} className="product-image" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        images={images}
        initialIndex={modalStartIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export { ProductGallery };
