import type React from "react";
import HeroSection from "./hero-section/hero-section";
import PartnersSection from "./partners-section/partners-section";
import DeliverySection from "./delivery-section/delivery-section";

const HomePage: React.FC<{}> = () => {
    return <main>
        <HeroSection/>
        <DeliverySection/>
        <PartnersSection/>
    </main>
}


export default HomePage;