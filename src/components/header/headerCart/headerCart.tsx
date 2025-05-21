import { Link } from 'react-router-dom';
import cart from '../../../assets/img/header/cart.svg';
import './headerCart.scss';

function HeaderCart() {
  return (
    <div className="header__cart">
      <Link to="/cart" className='cart-block'>
        <img src={cart} alt="cart-image" />
      </Link>
    </div>
  );
}

export default HeaderCart;
