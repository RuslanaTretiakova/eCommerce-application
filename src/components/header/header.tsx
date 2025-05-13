import React from "react";
import Logo from "../logo/logo";
import './header.scss'
import HeaderNavigation from "./header-navigation/header-navigation";

const Header: React.FC<{}> = () => {
    return <header className="header">
    <Logo />
    <HeaderNavigation />
    </header>
}

export default Header;