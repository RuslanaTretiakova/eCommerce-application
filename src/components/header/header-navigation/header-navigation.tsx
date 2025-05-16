import type React from 'react';
import './header-navigation.scss';

const HeaderNavigation: React.FC<{}> = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__tab">Home</li>
        <li className="navigation__tab">Products</li>
        <li className="navigation__tab">About us</li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
