import './headerProfile.scss';
import profile from '../../../assets/img/header/profile.svg';
import { Link } from 'react-router-dom';
import closeMobileMenu from '../../../utils/closeMobileNavigation/closeMobileNavigation';
import { useAuth } from '../../../api/authorithation/AuthToken';

function HeaderProfile() {
  debugger;
  const { isAnonymous } = useAuth();

  return (
    <div className="header__profile-block">
      <Link
        to={!isAnonymous ? '/profile-info' : '/profile-access-block'}
        onClick={() => {
          if (window.innerWidth <= 768) {
            closeMobileMenu();
          }
        }}
      >
        <img src={profile} alt="profile-image" />
      </Link>
    </div>
  );
}

export default HeaderProfile;
