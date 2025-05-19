import './headerProfile.scss';
import profile from '../../../assets/img/header/profile.svg';

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
