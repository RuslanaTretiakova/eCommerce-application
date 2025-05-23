import Wheel from './weel/weel';
import './404.scss';
import ClosedRoad from '../../assets/img/closed-road.svg';
import Reset from '../../assets/img/reset.svg';
import { Link } from 'react-router-dom';
function NotFoundPage() {
  return (
      <div className="not-found">
          <div className="title">
              <p>4</p>
              <Wheel />
              <p>4</p>
      </div>

        <h2 className="title-second">This ride suddenly stopped.&#9940;</h2>
          <p className="text">
            Looks like the road ended mid-journey.<img src={ClosedRoad} alt="closed-road" /> 
          </p> 

          <p className="text">
            No worries — reset your route and try again.<img src={Reset} alt="reset" />
          </p>

          <Link to="/" className="return-button button">Return to Home</Link>
    </div>
  );
}

export default NotFoundPage;
