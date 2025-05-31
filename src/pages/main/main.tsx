import Header from '../../components/header/header';
import './main.scss';
import Footer from '../../components/footer/footer';
import { Outlet } from 'react-router-dom';



function MainPage() {
  // useEffect(() => {
  //   fetchAnonymousToken();
  // }, []);
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainPage;
