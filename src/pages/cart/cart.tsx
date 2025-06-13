import { Link } from 'react-router-dom';
import './cart.scss';

interface CartItem {
  discountedPrice: number;
  originalPrice: number;
  name: string;
  img: string;
  quantity: number;
}

function Cart() {
  // const { cart, loading } = useCart();
  const cart = {
    items: [
      {
        discountedPrice: 2456,
        originalPrice: 2500,
        name: 'Dallingridge Chic Junior Girls Full Suspension - Purple',
        img: 'https://www.cycleking.co.uk/images/products/S/SH/SHOCKER%20PURP[LE-2.png?width=1998&height=1998&quality=85&mode=pad&format=webp&bgcolor=ffffff',
        quantity: 1,
      },
      {
        discountedPrice: 500,
        originalPrice: 700,
        name: 'Dallingridge Chic Junior Girls Full Suspension - rest',
        img: 'https://uk.fiido.com/cdn/shop/files/1-c11_ae404daa-e4bf-405b-b778-01f2c195a61a_1000x.webp?v=1740470740',
        quantity: 2,
      },
    ],
  };

  // if (loading) return <p>Loading card...</p>

  if (!cart || !cart.items || cart.items.length === 0) {
    return <p>Empty</p>;
  }

  return (
    <div className="temp">
      <h1>Cart page</h1>
      <div className="cart-container">
        <div className="cart-products">
          <button type="button" className="remove-all-btn">
            Remove all items
          </button>

          {cart.items.map((item: CartItem) => (
            <div className="cart-product">
              <img src={item.img} alt="product" className="cart-product__image" />
              <div className="cart-product__details">
                <h3>{item.name}</h3>
                <p className="cart-product__discounted">{`${item.discountedPrice} EURO`}</p>
                <p className="cart-product__price">{`${item.originalPrice} EURO`}</p>
                <div className="cart-product__actions">
                  <div className="quantity-control">
                    <button className="quantity-btn" type="button">
                      -
                    </button>
                    <input type="text" className="quantity-input" value={item.quantity} />
                    <button className="quantity-btn" type="button">
                      +
                    </button>
                  </div>
                  <button className="remove-btn" type="button">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3 className="summary-title">Summury</h3>
          <div className="summary-row">
            <span>Total: </span>
            <span>498 EURO</span>
          </div>
          <div className="summary-row summary-total">
            <span>Final total with discount: </span>
            <span>498 EURO</span>
          </div>
          <button className="checkout-btn" type="button">
            Check in
          </button>
          <Link to="/products/all" className="continue-shopping">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
