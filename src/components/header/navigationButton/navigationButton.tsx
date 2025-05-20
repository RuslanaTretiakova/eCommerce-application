import './navigationButton.scss';

function NavigationButton() {
  const setMenuOpen = () => {
    let navigationOpen = document.querySelector('.navigation-open');
    const body = document.querySelector('body') as HTMLBodyElement;
    const button = document.querySelector('.navigation-button') as HTMLElement;

    if (!navigationOpen) {
      const navigation = document.querySelector('.navigation');
      navigation?.classList.add('navigation-open');
      button.classList.add('navigation-button_clicked');
      button.children[0].classList.add('first-line__open');
      button.children[1].classList.add('second-line__open');
      body.classList.add('no-scroll');
    } else {
      navigationOpen?.classList.remove('navigation-open');
      body.classList.remove('no-scroll');
      button.children[0].classList.remove('first-line__open');
      button.children[1].classList.remove('second-line__open');
      button.classList.remove('navigation-button_clicked');
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
