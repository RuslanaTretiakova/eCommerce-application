import { Link } from 'react-router-dom';
import './headerNavigation.scss';
import { useEffect } from 'react';
import closeMobileMenu from '../../../utils/closeMobileNavigation/closeMobileNavigation';

function HeaderNavigation() {
  // const closeMobileMenu = () => {
  //   if (window.innerWidth <= 768) {
  //     const navigation = document.querySelector('.navigation') as HTMLElement;
  //     const button = document.querySelector('.navigation-button') as HTMLElement;
  //     const body = document.querySelector('body') as HTMLBodyElement;

  //     navigation?.classList.remove('navigation-open');
  //     body?.classList.remove('no-scroll');
  //     button?.classList.remove('navigation-button_clicked');
  //     button?.children[0]?.classList.remove('first-line__open');
  //     button?.children[1]?.classList.remove('second-line__open');
  //   }
  // }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__tab">
          <Link to="/" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className="navigation__tab">
          <Link to="/products" onClick={closeMobileMenu}>
            Products
          </Link>
        </li>
        <li className="navigation__tab">
          <Link to="/about" onClick={closeMobileMenu}>
            {' '}
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
