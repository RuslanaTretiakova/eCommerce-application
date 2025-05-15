import type React from "react";
import HeroSection from "./hero-section/hero-section";
import PartnersSection from "./partners-section/partners-section";

const HomePage: React.FC<{}> = () => {
    return <main>
        <HeroSection/>
        <PartnersSection/>
    </main>
}


export default HomePage;