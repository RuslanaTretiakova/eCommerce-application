import React from "react";
import Logo from "../logo/logo";
import './header.scss'

const Header: React.FC<{}> = () => {
    return <header className="header">
    <Logo />
    </header>
}

export default Header;