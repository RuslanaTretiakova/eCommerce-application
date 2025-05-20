import './logo.scss';

interface LogoProps {
  way: string;
}

function Logo({ way }: LogoProps) {
  return (
    <div className="logo">
      <a href="/homePage">
        <img src={way} alt="logo_bike" />
      </a>
    </div>
  );
}

export default Logo;
