import './footer.scss';
import Logo from '../logo/logo';
import DevelopedBlock from './developedBlock/developedBlock';
import Copyright from './copyright/copyright';

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <DevelopedBlock />
      <Copyright />
    </footer>
  );
}

export default Footer;
