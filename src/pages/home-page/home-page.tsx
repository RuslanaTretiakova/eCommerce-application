import type React from 'react';
import HeroSection from './hero-section/hero-section';
import PartnersSection from './partners-section/partners-section';
import DeliverySection from './delivery-section/delivery-section';
import LocationSection from './location-section/location-section';
import './home-page.scss';

const HomePage: React.FC<{}> = () => {
  return (
    <main className="home-page">
      <HeroSection />
      <DeliverySection />
      <LocationSection />
      <PartnersSection />
    </main>
  );
};

export default HomePage;
