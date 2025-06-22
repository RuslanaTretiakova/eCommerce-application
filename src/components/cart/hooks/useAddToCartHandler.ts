import { useAuth } from '../../../api/authorithation/AuthToken';
import { useCart } from './useCart';
import { showNotification } from '../../../utils/toastify/showNotification';
import { fetchToken } from '../../../utils/token/tokenType';
import {
  getAnonymousId,
  generateAnonymousId,
  setAnonymousId,
  setCartId,
} from '../../../utils/cart/localStorage';
import { fetchActiveAnonCart } from '../../../api/cart/getActiveAnonCart';
import { createCart } from '../../../api/cart/cart';
import { removeFromCartClient } from '../../../api/cart/removeFromCartClient';

export const useAddToCartHandler = () => {
  const { addToCart, isProductInCart, cart, setCart } = useCart();
  const { token, setToken, isAnonymous } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement> | null, sku: string) => {
    if (e) e.stopPropagation();

    try {
      let currentToken = token;
      if (!currentToken) {
        const { token: newToken, scope } = await fetchToken('anonymous');
        setToken(newToken, scope);
        currentToken = newToken;
      }

      let cartId = localStorage.getItem('cartId');
      let cartVersion = localStorage.getItem('cartVersion');

      if (!cartId || !cartVersion) {
        const existingCart = await fetchActiveAnonCart(currentToken);
        if (existingCart?.id && existingCart.cartState === 'Active') {
          cartId = existingCart.id;
          cartVersion = String(existingCart.version);
          setCartId(cartId!);
          localStorage.setItem('cartVersion', cartVersion);
          showNotification({ text: 'Existing cart reused', type: 'info' });
        }
      }

      if (!cartId || !cartVersion) {
        let anonId = getAnonymousId();
        if (!anonId) {
          anonId = generateAnonymousId();
          setAnonymousId(anonId);
        }

        const newCart = await createCart(currentToken, isAnonymous, anonId);
        if (!newCart?.id) throw new Error('Cart creation failed');

        cartId = newCart.id;
        cartVersion = String(newCart.version);
        setCartId(cartId);
        localStorage.setItem('cartVersion', cartVersion);
        showNotification({ text: 'Cart created successfully', type: 'info' });
      }

      await addToCart(sku);
      showNotification({ text: 'Product added to cart', type: 'success' });
    } catch (error) {
      console.error('Add to cart failed:', error);
      showNotification({ text: 'Failed to add product to cart', type: 'error' });
    }
  };

  const handleRemoveFromCart = async (e: React.MouseEvent, sku: string) => {
    e.stopPropagation();

    if (!token || !cart) return;

    const cartId = localStorage.getItem('cartId');
    const version = cart.version;
    const lineItem = cart.lineItems.find((item) => item.variant.sku === sku);

    if (!cartId || !lineItem) return;

    try {
      const updatedCart = await removeFromCartClient({
        token,
        cartId,
        version,
        lineItemId: lineItem.id,
      });

      setCart(updatedCart);
      localStorage.setItem('cartVersion', String(updatedCart.version));
      showNotification({ text: 'Product removed from cart', type: 'success' });
    } catch (error) {
      console.error('Remove from cart failed:', error);
      showNotification({ text: 'Failed to remove product from cart', type: 'error' });
    }
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    isProductInCart,
  };
};
