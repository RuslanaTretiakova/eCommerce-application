import { Link } from 'react-router-dom';
import './userLoginProfile.scss';
// import { useAuth } from '../../api/authorithation/AuthToken';
import { useLogout } from '../../api/authorithation/handleLogout';

function UserLoginProfile() {
  // debugger;
  const logout = useLogout();
  return (
    <div className="user-login-profile">
      <Link to="/profile-info" className="button">
        Edit profile
      </Link>
      <button type="button" className="button" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
}

export default UserLoginProfile;
