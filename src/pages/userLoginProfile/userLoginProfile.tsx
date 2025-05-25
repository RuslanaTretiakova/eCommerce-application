import { Link } from 'react-router-dom';
import './userLoginProfile.scss';
import { useAuth } from '../../api/authorithation/AuthToken';
import { useLogout } from '../../api/authorithation/handleLogout';

function UserLoginProfile() {
  debugger;
  const logout = useLogout();
  const token = useAuth();
  return (
    <div className="user-login-profile">
      <h3>
        token:
        {token.token}
      </h3>
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
