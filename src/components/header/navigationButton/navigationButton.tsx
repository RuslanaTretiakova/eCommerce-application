import './navigationButton.scss';

function NavigationButton() {
  const setMenuOpen = () => {
    let navigationOpen = document.querySelector('.navigation-open');
    const body = document.querySelector('body') as HTMLBodyElement;
    if (!navigationOpen) {
      const navigation = document.querySelector('.navigation');
      navigation?.classList.add('navigation-open');

      body.classList.add('no-scroll');
    } else {
      navigationOpen?.classList.remove('navigation-open');
      body.classList.remove('no-scroll');
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
