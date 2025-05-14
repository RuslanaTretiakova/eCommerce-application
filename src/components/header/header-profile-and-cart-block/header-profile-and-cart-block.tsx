import type React from "react";
import HeaderProfile from "../header-profile/header-profile";
import HeaderCart from "../header-cart/header-cart";
import './header-profile-and-cart-block.scss'

const HeaderProfileAndCartBlock: React.FC<{}> = () => {
    return <div className="profile-and-cart-block">
        <HeaderProfile/>
        <HeaderCart/>
    </div>
}

export default HeaderProfileAndCartBlock