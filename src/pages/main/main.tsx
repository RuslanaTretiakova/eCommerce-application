import Header from '../../components/header/header';
import './main.scss';
import Footer from '../../components/footer/footer';
import { Outlet } from 'react-router-dom';
// import { Breadcrumbs } from '../../components/ui/breadcrumbs/Breadcrumbs';

function MainPage() {
  return (
    <div className="container">
      <Header />
      <main>
        {/* <Breadcrumbs /> */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
