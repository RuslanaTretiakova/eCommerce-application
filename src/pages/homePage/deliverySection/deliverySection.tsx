import delivery from '../../../assets/img/homePage/delivry-section.jpg';
import './deliverySection.scss';

function DeliverySection() {
  return (
    <section className="delivery-section">
      <img src={delivery} alt="delivery" />
      <p>
        We proudly deliver our bicycles to customers all around the world, ensuring that no matter
        where you are, the perfect ride is just a few clicks away. With reliable international
        shipping and a commitment to quality, we make it easy for cycling enthusiasts everywhere to
        experience our bikes — from city streets to mountain trails, across every continent.
      </p>
    </section>
  );
}

export default DeliverySection;
