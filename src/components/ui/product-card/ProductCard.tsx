import React from 'react';
import type { IProductCard } from '../../../types/interfaces';
import './product-card.scss';

const ProductCard = React.memo(({ name, description, price, imageUrl, discount }: IProductCard) => {
  return (
    <div className="product-card">
      <img className="product-card__image" src={imageUrl} alt={name} />
      <h2 className="product-card__title">{name}</h2>
      <p className="product-card__description">{description}</p>
      {discount ? (
        <>
          <div className="product-card__price product-card__price_cross">{price}</div>
          <div className="product-card__price_discount">{discount}</div>
        </>
      ) : (
        <div className="product-card__price">{price}</div>
      )}
    </div>
  );
});

export default ProductCard;
