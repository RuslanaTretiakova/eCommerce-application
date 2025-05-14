import type React from "react";
import Header from "../../components/header/header";
import HomePage from "../home-page/home-page";
import './main.scss'

const MainPage: React.FC<{}> = () => {
    return (
        <div className="container">

        <Header />
        <HomePage/>
       
      </div>
    )
}

export default MainPage;