import logo from '../../assets/img/logo.svg';
import './logo.scss';

function Logo() {
  return (
    <div className="logo">
      <a href="/homePage">
        <img src={logo} alt="logo_bike" />
      </a>
    </div>
  );
}

export default Logo;
