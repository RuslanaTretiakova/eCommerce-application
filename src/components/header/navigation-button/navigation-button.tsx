import type React from 'react';
import './navigation-button.scss';

const NavigationButton: React.FC<{}> = () => {
  const setMenuOpen = () => {
    let navigationOpen = document.querySelector('.navigation-open');
    if (!navigationOpen) {
      const navigation = document.querySelector('.navigation');
      navigation?.classList.add('navigation-open');
    } else {
      navigationOpen?.classList.remove('navigation-open');
    }
    console.log('Navigation button clicked');
    // Add your toggle logic here (e.g. open menu)
  };

  return (
    <div className="navigation-button" onClick={setMenuOpen}>
      <hr />
      <hr />
    </div>
  );
};

export default NavigationButton;
