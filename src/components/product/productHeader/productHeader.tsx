import './productHeader.scss';

interface ProductHeaderProps {
  title: string;
  price: number;
  discountedPrice: number | null;
}

function ProductHeader({ title, price, discountedPrice }: ProductHeaderProps) {
  // const discountedPrice = discount ? price - (price * discount) / 100 : price;
  return (
    <div className="product-header">
      <h1 className="product-title">{title}</h1>
      {discountedPrice ? (
        <div className="discounted-price">
          <h2 className="">{`$ ${discountedPrice.toFixed(2)}`}</h2>
          <h3 className="">{`$ ${price.toFixed(2)}`}</h3>
          {/* <p className="discount-percentage">{`-${discountedPrice}%`}</p> */}
        </div>
      ) : (
        <h2 className="original-price">{`$ ${price.toFixed(2)}`}</h2>
      )}
    </div>
  );
}

export default ProductHeader;
