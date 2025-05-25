import { Link } from 'react-router-dom';
import './userLoginProfile.scss';
import { useAuth } from '../../api/authorithation/AuthToken';

function UserLoginProfile() {
  debugger;
  const token = useAuth().token;
  return (
    <div className="user-login-profile">
      <h3>
        token:
        {token}
      </h3>
      <Link to="/profile-info" className="button">
        Edit profile
      </Link>
      <Link to="/" className="button">
        LOGOUT
      </Link>
    </div>
  );
}

export default UserLoginProfile;
