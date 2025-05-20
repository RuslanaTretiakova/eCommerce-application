import HeaderProfile from '../headerProfile/headerProfile';
import HeaderCart from '../headerCart/headerCart';
import './headerProfileAndCartBlock.scss';

function HeaderProfileAndCartBlock() {
  return (
    <div className="profile-and-cart-block">
      <HeaderProfile />
      <HeaderCart />
    </div>
  );
}

export default HeaderProfileAndCartBlock;
