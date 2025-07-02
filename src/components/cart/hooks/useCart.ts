import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../api/authorithation/AuthToken';
import {
  getAnonymousId,
  generateAnonymousId,
  setAnonymousId,
  getCartId,
  setCartId,
} from '../../../utils/cart/localStorage';
import type { Cart } from '../../../types/cartTypes';

import { createCart } from '../../../api/cart/cart';
import { fetchCart } from '../../../api/cart/fetchCart';
import { addToCart } from '../../../api/cart/addToCart';
import { clearCart } from '../../../api/cart/clearCart';

export const useCart = () => {
  const { token, isAnonymous } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartVersion, setCartVersion] = useState<number | null>(null);

  const initCart = useCallback(async (): Promise<string | null> => {
    if (!token) {
      console.warn('Token missing, cannot create cart');
      return null;
    }

    const existingCartId = getCartId();
    if (existingCartId) return existingCartId;

    let anonymousId: string | undefined = undefined;
    const storedAnonymousId = getAnonymousId();

    if (isAnonymous) {
      if (storedAnonymousId) {
        anonymousId = storedAnonymousId;
      } else {
        anonymousId = generateAnonymousId();
        setAnonymousId(anonymousId);
      }
    }

    const createdCart = await createCart(token, isAnonymous, anonymousId);

    if (createdCart?.id && typeof createdCart.version === 'number') {
      setCartId(createdCart.id);
      localStorage.setItem('cartVersion', String(createdCart.version));
      setCartVersion(createdCart.version);
      setCart(createdCart as Cart);
      return createdCart.id;
    }

    return null;
  }, [token, isAnonymous]);

  const fetchCartData = useCallback(async () => {
    const cartId = getCartId();
    if (!token || !cartId) return;

    try {
      setLoading(true);
      const fetchedCart = await fetchCart(cartId, token);
      setCart(fetchedCart);
      setCartVersion(fetchedCart.version);
      localStorage.setItem('cartVersion', String(fetchedCart.version));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleAddToCart = useCallback(
    async (sku: string) => {
      if (!token) throw new Error('Missing token');

      let cartId = getCartId();
      let versionStr = localStorage.getItem('cartVersion');

      if (!cartId || !versionStr) {
        cartId = await initCart();
        versionStr = localStorage.getItem('cartVersion');
      }

      const version = Number(versionStr);
      if (!cartId || isNaN(version)) throw new Error('Invalid cart version');

      const updatedCart = await addToCart(token, cartId, version, sku);
      setCart(updatedCart);
      setCartVersion(updatedCart.version);
      localStorage.setItem('cartVersion', String(updatedCart.version));

      return updatedCart;
    },
    [token, initCart],
  );

  const handleClearCart = useCallback(async () => {
    const cartId = getCartId();
    if (!token || !cartId) return;

    try {
      const clearedCart = await clearCart(cartId, token);
      setCart(clearedCart);
      setCartVersion(clearedCart.version);
      localStorage.setItem('cartVersion', String(clearedCart.version));
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  }, [token]);

  const isProductInCart = useCallback(
    (sku: string): boolean => {
      if (!cart) return false;
      return cart.lineItems.some((item) => item.variant.sku === sku);
    },
    [cart],
  );

  useEffect(() => {
    if (token) {
      fetchCartData();
    }
  }, [token, fetchCartData]);

  return {
    cart,
    setCart,
    token,
    loading,
    cartVersion,
    initCart,
    addToCart: handleAddToCart,
    clearCart: handleClearCart,
    fetchCart: fetchCartData,
    isProductInCart,
  };
};
