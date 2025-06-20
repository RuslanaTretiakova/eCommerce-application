import './App.scss';
import '../assets/styles/normalize.css';
import '../assets/styles/global.scss';

import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/homePage';
import MainPage from '../pages/main/main';
import Products from '../pages/products/products';
import About from '../pages/aboutUs/aboutUs';
import AuthenticationPage from '../pages/authorisation-page/AuthenticationPage';
import RegistrationPage from '../pages/registration-page/ui/RegistrationPage';
import Cart from '../pages/cart/cart';
import ProfileAccess from '../pages/profileAccess/profileAccess';
import NotFoundPage from '../pages/404/404';
import UserLoginProfile from '../pages/userLoginProfile/userLoginProfile';
import ProductPage from '../pages/product/ProductPage';

import { TokenProvider, useAuth } from '../api/authorithation/AuthToken';

import { fetchToken } from '../utils/token/tokenType';
import { useEffect, useState } from 'react';
import ProductsCategory from '../pages/productsCategory/productsCategory';
import Load from '../pages/load/load';

function InnerApp() {
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!token) {
          const { token: newToken, scope: newScope } = await fetchToken('anonymous');
          setToken(newToken, newScope);
        }
      } catch (error) {
        console.error('Token init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [token, setToken]);

  if (isLoading) {
    return <Load />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductsCategory />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile-access-block" element={<ProfileAccess />} />
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile-info" element={<UserLoginProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <TokenProvider>
      <InnerApp />
    </TokenProvider>
  );
}

export default App;
