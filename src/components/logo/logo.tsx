import { Link } from 'react-router-dom';
import './logo.scss';
import closeMobileMenu from '../../utils/closeMobileNavigation/closeMobileNavigation';

interface LogoProps {
  way: string;
}

function Logo({ way }: LogoProps) {
  return (
    <div className="logo">
      <Link
        to="/"
        className="logo-block"
        id="logo"
        onClick={() => {
          if (window.innerWidth <= 768) {
            closeMobileMenu();
          }
        }}
      >
        <img src={way} alt="logo_bike" />
      </Link>
    </div>
  );
}

export default Logo;
