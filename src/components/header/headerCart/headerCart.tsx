import { Link } from 'react-router-dom';
import cart from '../../../assets/img/header/cart.svg';
import './headerCart.scss';
import closeMobileMenu from '../../../utils/closeMobileNavigation/closeMobileNavigation';

function HeaderCart() {
  return (
    <div className="header__cart">
      <Link
        to="/cart"
        className="cart-block"
        onClick={() => {
          if (window.innerWidth <= 768) {
            closeMobileMenu();
          }
        }}
      >
        <img src={cart} alt="cart-image" />
      </Link>
    </div>
  );
}

export default HeaderCart;
