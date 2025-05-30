import React from 'react';
import type { IProductCard } from '../../../types/interfaces';
import './product-card.scss';

const ProductCard = React.memo(({ name, description, price, imageUrl }: IProductCard) => {
  return (
    <div className="product-card">
      <img className="product-card__image" src={imageUrl} alt={name} />
      <h2 className="product-card__title">{name}</h2>
      <p className="product-card__description">{description}</p>
      <div className="product-card__price">{price}</div>
    </div>
  );
});

export default ProductCard;
