import HeaderProfile from '../headerProfile/headerProfile';
import HeaderCart from '../headerCart/headerCart';
import UserLogOut from '../logoutComponent/LogOutComponent';
import './headerProfileAndCartBlock.scss';

function HeaderProfileAndCartBlock() {
  return (
    <div className="profile-and-cart-block">
      <HeaderProfile />
      <HeaderCart />
      <UserLogOut />
    </div>
  );
}

export default HeaderProfileAndCartBlock;
