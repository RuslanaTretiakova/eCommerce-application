import { useEffect, useState } from 'react';
import './navigationButton.scss';

function NavigationButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const navigation = document.querySelector('.navigation');
    const button = document.querySelector('.navigation-button') as HTMLElement;
    const body = document.querySelector('body') as HTMLBodyElement;

    if (!navigation || !button) return;

    if (menuOpen) {
      navigation.classList.add('navigation-open');
      button.classList.add('navigation-button_clicked');
      button.children[0].classList.add('first-line__open');
      button.children[1].classList.add('second-line__open');
      body.classList.add('no-scroll');
    } else {
      navigation.classList.remove('navigation-open');
      button.classList.remove('navigation-button_clicked');
      button.children[0].classList.remove('first-line__open');
      button.children[1].classList.remove('second-line__open');
      body.classList.remove('no-scroll');
    }

    return () => {
      body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <button
      className="navigation-button"
      onClick={toggleMenu}
      type="button"
      aria-label="Toggle navigation menu"
    >
      <hr />
      <hr />
    </button>
  );
}

export default NavigationButton;
