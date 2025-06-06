import { useLogout } from '../../../api/authorithation/handleLogout';
import logoutIcon from '../../../assets/img/header/logout.svg';

import './logout.scss';

function UserLogOut() {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <button type="button" className="user-logout-button" onClick={handleLogout} aria-label="Logout">
      <img src={logoutIcon} alt="" width={30} height={30} aria-hidden="true" />
    </button>
  );
}

export default UserLogOut;
