import type React from 'react';
import './hero-section.scss';

const HeroSection: React.FC<{}> = () => {
  return (
    <section className="hero-section">
      <h1>
        <em className="slogan-1">Ride with confidence.</em>
        <br />
        <em className="slogan-2">Ride with joy.</em> 
{' '}
<br />{' '}
        <em className="slogan-3">Ride with ReMotionX.</em>
{' '}
      </h1>
    </section>
  );
};

export default HeroSection;
