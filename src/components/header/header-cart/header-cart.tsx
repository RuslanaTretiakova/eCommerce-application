import type React from 'react';
import cart from '../../../assets/img/cart.svg';
import './header-cart.scss';

const HeaderCart: React.FC<{}> = () => {
  return (
    <div className="header__cart">
      <a href="">
        <img src={cart} alt="cart-image" />
      </a>
    </div>
  );
};

export default HeaderCart;
