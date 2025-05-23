export default function closeMobileMenu() {
  if (window.innerWidth <= 768) {
    const navigation = document.querySelector('.navigation') as HTMLElement;
    const button = document.querySelector('.navigation-button') as HTMLElement;
    const body = document.querySelector('body') as HTMLBodyElement;

    navigation?.classList.remove('navigation-open');
    body?.classList.remove('no-scroll');
    button?.classList.remove('navigation-button_clicked');
    button?.children[0]?.classList.remove('first-line__open');
    button?.children[1]?.classList.remove('second-line__open');
  }
}
