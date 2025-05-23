import { Link } from 'react-router-dom';
import './logo.scss';

interface LogoProps {
  way: string;
}

function Logo({ way }: LogoProps) {
  return (
    <div className="logo">
      <Link to="/" className="logo-block" id="logo">
        <img src={way} alt="logo_bike" />
      </Link>
    </div>
  );
}

export default Logo;
