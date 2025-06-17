import { useAuth } from '../../../api/authorithation/AuthToken';
import { createCart } from '../../../api/cart/cart';
import {
  generateAnonymousId,
  getAnonymousId,
  getCartId,
  setAnonymousId,
  setCartId,
} from '../../../utils/cart/localStorage';

export const useCart = () => {
  const { token, isAnonymous } = useAuth();

  const initCart = async (): Promise<string | null> => {
    if (!token) {
      console.warn('Token missing, cannot create cart');
      return null;
    }

    const existingCartId = getCartId();
    if (existingCartId) return existingCartId;

    let anonymousId: string | undefined = isAnonymous ? (getAnonymousId() ?? undefined) : undefined;

    if (isAnonymous && !anonymousId) {
      anonymousId = generateAnonymousId();
      setAnonymousId(anonymousId);
    }

    const cart = await createCart(token, isAnonymous, anonymousId);
    if (cart?.id) {
      setCartId(cart.id);
      return cart.id;
    }

    return null;
  };

  return { initCart };
};
