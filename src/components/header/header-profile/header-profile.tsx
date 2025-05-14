import type React from "react";
import './header-profile.scss'
import profile from'../../../assets/img/profile.svg'

const HeaderProfile: React.FC<{}> = () => {
    return <div className="header__profile-block">
        <a href="">
            <img src={profile} alt="profile-image" />
        </a>
    </div>
}

export default HeaderProfile