import './itemHeader.scss';

interface ItemHeaderProps {
  title: string;
  price: number;
  discount: number;
}

function ItemHeader({ title, price, discount }: ItemHeaderProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  return (
    <div className="item_header">
      <h1 className="item-title">{title}</h1>
      {discount ? (
        <div className="discounted-price">
          <h2 className="">{`$ ${discountedPrice.toFixed(2)}`}</h2>
          <h3 className="">{`$ ${price.toFixed(2)}`}</h3>
          <p className="discount-percentage">{`-${discount}%`}</p>
        </div>
      ) : (
        <h2 className="original-price">{`$ ${price.toFixed(2)}`}</h2>
      )}
    </div>
  );
}

export default ItemHeader;
