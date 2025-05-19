import HeaderProfile from '../headerProfile/headerProfile';
import HeaderCart from '../headerCart/headerCart';
import './header-profile-and-cart-block.scss';

function HeaderProfileAndCartBlock() {
  return (
    <div className="profile-and-cart-block">
      <HeaderProfile />
      <HeaderCart />
    </div>
  );
}

export default HeaderProfileAndCartBlock;
