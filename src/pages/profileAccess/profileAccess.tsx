import { Link } from 'react-router-dom';
import './profileAccess.scss';

function ProfileAccess() {
  return (
    <div className="profile-access-block">
      <h3>Time to ride!</h3>
      <div className="access-buttons-container">
        <p>Already with us? Hit &#39;Login&#39;.</p>
        <Link to="/login" className="access-button button">
          Login
        </Link>

        <p>First time here? Welcome — registration is just one click away!</p>

        <Link to="/registration" className="access-button button">
          Registration
        </Link>
      </div>
    </div>
  );
}

export default ProfileAccess;
