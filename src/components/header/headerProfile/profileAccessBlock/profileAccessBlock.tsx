import { Link } from 'react-router-dom';
import './profileAccessBlock.scss';

function ProfileAccessBlock() {
  return (
    <div className="profile-access-block">
      <h3>Time to ride!</h3>
      <div className="access-buttons-container">
        <p>Already with us? Hit &#39;Login&#39;.</p>
        <Link to="/login" className="access-button">
          Login
        </Link>

        <p>First time here? Welcome — registration is just one click away!</p>
        <li>
          <Link to="/registration" className="access-button">
            Registration
          </Link>
        </li>
      </div>
    </div>
  );
}

export default ProfileAccessBlock;
