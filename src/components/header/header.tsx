import Logo from '../logo/logo';
import './header.scss';
import HeaderNavigation from './headerNavigation/headerNavigation';
import HeaderProfileAndCartBlock from './headerProfileAndCartBlock/headerProfileAndCartBlock';
import NavigationButton from './navigationButton/navigationButton';
import headerLogo from '../../assets/img/header/logo2.svg';

function Header() {
  return (
    <header className="header">
      <Logo way= {headerLogo}/>
      <HeaderNavigation />
      <HeaderProfileAndCartBlock />
      <NavigationButton />
    </header>
  );
}

export default Header;
