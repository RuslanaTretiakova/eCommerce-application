import './footer.scss';
import Logo from '../logo/logo';
import DevelopedBlock from './developedBlock/developedBlock';
import Copyright from './copyright/copyright';
import footerLogo from '../../assets/img/header/logo3.svg'

function Footer() {
  return (
    <footer className="footer">
      <Logo way={footerLogo}/>
      <DevelopedBlock />
      <Copyright />
    </footer>
  );
}

export default Footer;
