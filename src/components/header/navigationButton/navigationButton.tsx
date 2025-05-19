import './navigation-button.scss';

function NavigationButton() {
  const setMenuOpen = () => {
    let navigationOpen = document.querySelector('.navigation-open');
    if (!navigationOpen) {
      const navigation = document.querySelector('.navigation');
      navigation?.classList.add('navigation-open');
    } else {
      navigationOpen?.classList.remove('navigation-open');
    }
  };

  return (
    <button
      className="navigation-button"
      onClick={setMenuOpen}
      type="button"
      aria-label="Toggle navigation menu"
    >
      <hr />
      <hr />
    </button>
  );
}

export default NavigationButton;
