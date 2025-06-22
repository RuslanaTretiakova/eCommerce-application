import HeroSection from './heroSection/heroSection';
import PromoSection from './promoSection/promoSection';
import PartnersSection from './partnersSection/partnersSection';
import DeliverySection from './deliverySection/deliverySection';
import LocationSection from './locationSection/locationSection';
import './homePage.scss';

function HomePage() {
  return (
    <main className="home-page">
      <PromoSection />
      <HeroSection />
      <DeliverySection />
      <LocationSection />
      <PartnersSection />
    </main>
  );
}

export default HomePage;
