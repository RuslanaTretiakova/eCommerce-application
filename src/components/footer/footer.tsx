import type React from 'react';
import './footer.scss';
import Logo from '../logo/logo';
import DevelopedBlock from './develop-block/developedBlock';
import Copyright from './copyright/copyright';


const Footer: React.FC = () => {
  return <footer className="footer">
    <Logo/>
   <DevelopedBlock/>
   <Copyright/>
  </footer>
};

export default Footer;
