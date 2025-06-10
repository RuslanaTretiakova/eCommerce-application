import { useLogout } from '../../../api/authorithation/handleLogout';
import { useAuth } from '../../../api/authorithation/AuthToken';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../../../assets/img/header/logout.svg';

import './logout.scss';

function UserLogOut() {
  const logout = useLogout();
  const { isAnonymous, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (isAnonymous || !token) return null;

  return (
    <button type="button" className="user-logout-button" onClick={handleLogout} aria-label="Logout">
      <img src={logoutIcon} alt="" width={30} height={30} aria-hidden="true" />
    </button>
  );
}

export default UserLogOut;
