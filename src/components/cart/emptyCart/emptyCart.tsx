import { Link } from 'react-router-dom';
import cartIcon from '../../../assets/img/header/cart.svg';
// import './cart.scss';

function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">
        <img src={cartIcon} alt="cart-image" />
      </div>

      <h2 className="empty-cart-title">Your cart is empty</h2>
      <p className="empty-cart-text">Looks like you have not added anything to your cart yet</p>
      <Link to="/products" className="continue-shopping">
        Continue shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
