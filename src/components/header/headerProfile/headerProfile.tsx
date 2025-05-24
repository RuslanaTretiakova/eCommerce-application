import './headerProfile.scss';
import profile from '../../../assets/img/header/profile.svg';
import { Link } from 'react-router-dom';
import closeMobileMenu from '../../../utils/closeMobileNavigation/closeMobileNavigation';

function HeaderProfile() {
  // const [openProfileAccesBlock, setOpenProfileAccesBlock] = useState(false);

  // const toggleProfileAccessBlock = () => {
  //   setOpenProfileAccesBlock((prev) => !prev);
  // };

  // useEffect(() => {
  //   const profileAccessBlock = document.querySelector('.profile-access-block');
  //   console.log(profileAccessBlock);
  // }, [openProfileAccesBlock]);

  return (
    <div className="header__profile-block">
      <Link
        to="/profile-access-block"
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
