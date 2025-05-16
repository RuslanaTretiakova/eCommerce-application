import React from 'react';
import logo from '../../assets/img/logo.svg';
import './logo.scss';

const Logo: React.FC<{}> = () => {
  return (
    <div className="logo">
      <a href="">
        <img src={logo} alt="logo_bike" />
      </a>
    </div>
  );
};

export default Logo;
