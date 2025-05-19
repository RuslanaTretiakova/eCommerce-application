import Logo from '../logo/logo';
import './header.scss';
import HeaderNavigation from './headerNavigation/headerNavigation';
import HeaderProfileAndCartBlock from './headerProfileAndCartBlock/headerProfileAndCartBlock';
import NavigationButton from './navigationButton/navigationButton';

function Header() {
  return (
    <header className="header">
      <Logo />
      <HeaderNavigation />
      <HeaderProfileAndCartBlock />
      <NavigationButton />
    </header>
  );
}

export default Header;
