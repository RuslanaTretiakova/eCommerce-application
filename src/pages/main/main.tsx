import Header from '../../components/header/header';
import HomePage from '../homePage/homePage';
import './main.scss';
import Footer from '../../components/footer/footer';

function MainPage() {
  return (
    <div className="container">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default MainPage;
