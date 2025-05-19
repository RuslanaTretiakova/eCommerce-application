import cart from '../../../assets/img/header/cart.svg';
import './headerCart.scss';

function HeaderCart() {
  return (
    <div className="header__cart">
      <a href="/cart">
        <img src={cart} alt="cart-image" />
      </a>
    </div>
  );
}

export default HeaderCart;
