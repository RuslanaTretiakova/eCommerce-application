import './weel.scss'; // стили для анимации

function Wheel() {
  return (
    <svg
      className="wheel"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Круг внешнего обода */}
      <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
      {/* Спицы */}
      <line x1="50" y1="5" x2="50" y2="95" stroke="black" strokeWidth="2" />
      <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="2" />
      <line x1="20" y1="20" x2="80" y2="80" stroke="black" strokeWidth="2" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="black" strokeWidth="2" />
    </svg>
  );
}

export default Wheel;
