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

import { createCart } from '../api/cart/cart';
import { getAnonymousId, setCartId } from '../utils/cart/localStorage';

function InnerApp() {
  const { token, scope, setToken, isAnonymous } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!token) {
          const { token, scope } = await fetchToken('anonymous');
          setToken(token, scope);
        } else {
          const anonymousId = getAnonymousId();
          const result = await createCart(token, isAnonymous, anonymousId ?? undefined);

          if (result?.id && result?.version !== undefined) {
            setCartId(result.id);
            localStorage.setItem('cartVersion', String(result.version));
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [token]);

  console.log('Token:', token);
  console.log('Scope:', scope);

  if (isLoading) {
    return <div>Loading...</div>;
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
        <Route path="/cart/:cartId" element={<Cart />} />
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
