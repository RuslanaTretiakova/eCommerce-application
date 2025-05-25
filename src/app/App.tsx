import './App.scss';
import '../assets/styles/normalize.css';
import '../assets/styles/global.scss';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/homePage';
import MainPage from '../pages/main/main';
import Products from '../pages/products/products';
import About from '../pages/aboutUs/aboutUs';
import AuthenticationPage from '../pages/authorisation-page/AuthenticationPage';
import { TokenProvider } from '../api/authorithation/AuthToken';
import RegistratontionPage from '../pages/registration-page/ui/RegistrationPage';
import Cart from '../pages/cart/cart';
import ProfileAccess from '../pages/profileAccess/profileAccess';
import NotFoundPage from '../pages/404/404';
import UserLoginProfile from '../pages/userLoginProfile/userLoginProfile';

function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile-access-block" element={<ProfileAccess />} />
          <Route path="/login" element={<AuthenticationPage />} />
          <Route path="/registration" element={<RegistratontionPage />} />
          <Route path="/profile-info" element={<UserLoginProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </TokenProvider>
  );
}

export default App;
