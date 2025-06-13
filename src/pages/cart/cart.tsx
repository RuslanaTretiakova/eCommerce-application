import { Link } from 'react-router-dom';
import './cart.scss';

function Cart() {
  return (
    <div className="temp">
      <h1>Cart page</h1>
      <div className="cart-container">
        <div className="cart-products">
          <button type="button" className="remove-all-btn">Remove all items</button>
          <div className="cart-product">
            <img
              src="https://www.cycleking.co.uk/images/products/S/SH/SHOCKER%20PURP[LE-2.png?width=1998&height=1998&quality=85&mode=pad&format=webp&bgcolor=ffffff"
              alt="product"
              className="cart-product__image"
            />
            <div className="cart-product__details">
              <h3>Dallingridge Chic Junior Girls Full Suspension - Purple</h3>
              <p className="cart-product__discounted">200.00 EURO</p>
              <p className="cart-product__price">264.00 EURO</p>
              <div className="cart-product__actions">
                <div className="quantity-control">
                  <button className="quantity-btn" type="button">
                    -
                  </button>
                  <input type="text" className="quantity-input" value="1" />
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

          <div className="cart-product">
            <img
              src="https://contents.mediadecathlon.com/p2017515/k$a71a24f2ef7d8c381950901b2f19eea4/picture.jpg?format=auto&f=3000x0"
              alt="product"
              className="cart-product__image"
            />
            <div className="cart-product__details">
              <h3>Dallingridge Chic Junior Girls Full Suspension - Purple</h3>
              <p className="cart-product__discounted">200.00 EURO</p>
              <p className="cart-product__price">264.00 EURO</p>
              <div className="cart-product__actions">
                <div className="quantity-control">
                  <button className="quantity-btn" type="button">
                    -
                  </button>
                  <input type="text" className="quantity-input" value="1" />
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
