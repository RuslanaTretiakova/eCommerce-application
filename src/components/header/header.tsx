import React from "react";
import Logo from "../logo/logo";
import './header.scss'
import HeaderNavigation from "./header-navigation/header-navigation";
import HeaderProfileBlock from "./header-profile/header-profile";
import HeaderCart from "./header-cart/header-cart";
import HeaderProfileAndCartBlock from "./header-profile-and-cart-block/header-profile-and-cart-block";
import NavigationButton from "./navigation-button/navigation-button";

const Header: React.FC<{}> = () => {
    return <header className="header">
    <Logo />
    <HeaderNavigation />
   <HeaderProfileAndCartBlock/>
   <NavigationButton/>
    </header>
}

export default Header;