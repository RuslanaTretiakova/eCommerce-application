import { Link, useNavigate } from 'react-router-dom';

import { Breadcrumbs } from '../../components/ui/breadcrumbs/Breadcrumbs';

import './productsCategory.scss';
import kaskImg from '../../assets/img/kask-2.png';
import bikeImg from '../../assets/img/category-bike.png';
import allImg from '../../assets/img/all.png';

function ProductsCategory() {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    if (category === 'all') {
      navigate('/products/all');
    } else {
      navigate(`/products/${category}`);
    }
  };
  return (
    <div className="products-category-page">
      <Breadcrumbs />
      <div className="category-page__list">
        <button
          type="button"
          className="category-page__item"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNavigate('all');
          }}
          onClick={() => handleNavigate('all')}
        >
          <img src={allImg} alt="all-image" />
          <Link to="/products/all">All</Link>
        </button>
        <button
          type="button"
          className="category-page__item"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNavigate('helmets');
          }}
          onClick={() => handleNavigate('3ef0177d-a71d-4c42-98d9-2343d5890f87')}
        >
          <img src={kaskImg} alt="kask-image" />
          <Link to="/products/helmets">Helmets</Link>
        </button>
        <button
          type="button"
          className="category-page__item"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNavigate('bikes');
          }}
          onClick={() => handleNavigate('b73e6212-590c-4dda-9f74-afc8bfc40529')}
        >
          <img src={bikeImg} alt="bike-image" />
          <Link to="/products/bikes">Bikes</Link>
        </button>
      </div>
    </div>
  );
}

export default ProductsCategory;
