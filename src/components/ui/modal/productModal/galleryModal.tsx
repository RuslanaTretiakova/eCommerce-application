import React, { useEffect, useCallback, useState } from 'react';
import '../productModal/productModal.scss'

type ModalProps = {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ images, initialIndex, isOpen, onClose }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowRight') {
        setCurrentIndex((i) => (i + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, images.length, onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;
    if (diff > threshold) {
      setCurrentIndex((i) => (i + 1) % images.length);
    } else if (diff < -threshold) {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="gallery-modal__overlay" onClick={onClose} aria-hidden="true" role="button">
      <div
        className="gallery-modal__content"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="button"
      >

        <button
          type="button"
          className="gallery-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          {' '}
          &times;
        </button>

        <button type="button" className="gallery-modal__prev">&#10094;</button>

        <img
          src={images[currentIndex]}
          alt={`Bike ${currentIndex + 1}`}
          className="gallery-modal__image"
        />

        <button type="button" className="gallery-modal__next">&#10095;</button>
      </div>
    </div>
  );
}
