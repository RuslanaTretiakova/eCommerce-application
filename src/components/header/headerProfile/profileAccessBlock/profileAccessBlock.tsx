import { Link } from 'react-router-dom';

function ProfileAccessBlock() {
  return (
      <div className="profile-access-block">
          <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registration">Registration</Link></li>
      </ul>
    </div>
  );
}

export default ProfileAccessBlock;
