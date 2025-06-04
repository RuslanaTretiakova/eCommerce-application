import './productHeader.scss';

interface ProductHeaderProps {
  title: string;
  price: number;
  discountedPrice: number | null;
}

function ProductHeader({ title, price, discountedPrice }: ProductHeaderProps) {
  return (
    <div className="product-header">
      <h1 className="product-title">{title}</h1>
      {discountedPrice ? (
        <div className="discounted-price">
          <h2 className="">{`$ ${discountedPrice.toFixed(2)}`}</h2>
          <h3 className="">{`$ ${price.toFixed(2)}`}</h3>
        </div>
      ) : (
        <h2 className="original-price">{`$ ${price.toFixed(2)}`}</h2>
      )}
    </div>
  );
}

export default ProductHeader;
