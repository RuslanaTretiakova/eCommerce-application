import './header-profile.scss';
import profile from '../../../assets/img/profile.svg';

function HeaderProfile() {
  return (
    <div className="header__profile-block">
      <a href="/profile">
        <img src={profile} alt="profile-image" />
      </a>
    </div>
  );
}

export default HeaderProfile;
