import { useEffect, useCallback, useState } from 'react';
import { useAuth } from '../../api/authorithation/AuthToken';
import EmptyCart from '../../components/cart/emptyCart/emptyCart';
import CartWithItems from '../../components/cart/cartWithItems/cartWithItems';
import Load from '../load/load';
import type { CartItem } from '../../types/cartTypes';
import { useCart } from '../../components/cart/hooks/useCart';

import './cart.scss';

function Cart() {
  const { token } = useAuth();
  const { cart, loading, fetchCart } = useCart();

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  //clean cart
  const handleClearCart = useCallback(async () => {
    if (!token || !cart?.id) return;

    try {
      await fetch(`/.netlify/functions/cleanCart?cartId=${cart.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, [token, cart?.id, fetchCart]);

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
        await fetchCart();
        setPromoError(null);

        const hasDiscount = updatedCart.lineItems.some(
          (item: CartItem) => item.price.discounted || item.discountedPricePerQuantity?.length > 0,
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

  console.log('cartId:', cart?.id);
  console.log('Cart:', cart);
  console.log('Line Items:', cart?.lineItems);

  if (loading) return <Load />;

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
