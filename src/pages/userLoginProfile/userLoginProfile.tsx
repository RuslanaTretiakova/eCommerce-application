import { Link } from 'react-router-dom';
import './userLoginProfile.scss';

function UserLoginProfile() {
  return (
    <div className="user-login-profile">
      <h3>USER NAME</h3>
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
