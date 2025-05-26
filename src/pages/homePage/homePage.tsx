import HeroSection from './heroSection/heroSection';
import PartnersSection from './partnersSection/partnersSection';
import DeliverySection from './deliverySection/deliverySection';
import LocationSection from './locationSection/locationSection';
import './homePage.scss';

function HomePage() {
  return (
    <main className="home-page">
      <HeroSection />
      <DeliverySection />
      <LocationSection />
      <PartnersSection />
    </main>
  );
}

export default HomePage;
