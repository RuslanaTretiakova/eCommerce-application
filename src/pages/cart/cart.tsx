import { useEffect } from 'react';
import { useAuth } from '../../api/authorithation/AuthToken';
import EmptyCart from '../../components/cart/emptyCart/emptyCart';
import CartWithItems from '../../components/cart/cartWithItems/cartWithItems';
import Load from '../load/load';
import { useCart } from '../../components/cart/hooks/useCart';

import './cart.scss';

function Cart() {
  const { token } = useAuth();
  const { cart, loading, fetchCart, clearCart } = useCart();

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  if (loading) return <Load />;
  if (!cart) return <EmptyCart />;

  return cart.lineItems?.length > 0 ? (
    <CartWithItems cart={cart} handleClearCart={clearCart} />
  ) : (
    <EmptyCart />
  );
}

export default Cart;
