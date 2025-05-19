import cart from '../../../assets/img/cart.svg';
import './header-cart.scss';

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
