import { Link } from 'react-router-dom';
import './headerNavigation.scss';

function HeaderNavigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__tab">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation__tab">
          <Link to="/products">Products</Link>
        </li>
        <li className="navigation__tab">
          <Link to="/about"> About us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
