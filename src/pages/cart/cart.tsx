import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Cart } from '../../types/cartTypes';
import { useAuth } from '../../api/authorithation/AuthToken';

import EmptyCart from '../../components/cart/emptyCart/emptyCart';
import CartWithItems from '../../components/cart/cartWithItems/cartWithItems';

import './cart.scss';

function Cart() {
  const { cartId } = useParams<{ cartId: string }>();
  const { token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/.netlify/functions/getCart?cartId=${cartId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const text = await res.text();

        try {
          const data = JSON.parse(text);
          setCart(data);
        } catch (err: unknown) {
          console.error('JSON parse error:', err);
          // console.warn('Response was:', text);
          throw new Error('Invalid JSON from server');
        }
      } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) errorMessage = error.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchCart();
    }
  }, [cartId, token]);

  //clean cart
  const handleClearCart = useCallback(async () => {
    if (!token || !cart?.id) return;

    try {
      const res = await fetch(`/.netlify/functions/cleanCart?cartId=${cart.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCart = await res.json();
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, [token, cart?.id]);

  //promocode
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleApplyPromoCode = async () => {
    if (!promoCode || !token || !cart?.id) return;

    try {
      const res = await fetch(`/.netlify/functions/applyPromoCode?cartId=${cart.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promoCode }),
      });

      const updatedCart = await res.json();

      if (res.ok) {
        setCart(updatedCart);
        setPromoError(null);

        const hasDiscount = updatedCart.lineItems.some(
          (item) => item.price.discounted || item.discountedPricePerQuantity?.length > 0,
        );

        if (!hasDiscount) {
          setPromoError('Promo code applied, but no discount matched');
        }
      } else {
        setPromoError(updatedCart.message || 'Invalid promo code');
      }
    } catch (err) {
      console.error('Promo code error:', err);
      setPromoError('Failed to apply promo code');
    }
  };

  console.log('cartId:', cartId);
  console.log('Cart:', cart);
  console.log('Line Items:', cart?.lineItems);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!cart) return <EmptyCart />;
  return cart.lineItems?.length > 0 ? (
    <CartWithItems
      cart={cart}
      handleClearCart={handleClearCart}
      promoCode={promoCode}
      setPromoCode={setPromoCode}
      promoError={promoError}
      handleApplyPromoCode={handleApplyPromoCode}
    />
  ) : (
    <EmptyCart />
  );
}

export default Cart;
