import './headerNavigation.scss';

function HeaderNavigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__tab">Home</li>
        <li className="navigation__tab">Products</li>
        <li className="navigation__tab">About us</li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
