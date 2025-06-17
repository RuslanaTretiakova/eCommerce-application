export const getCartId = (): string | null => localStorage.getItem('cartId');
export const setCartId = (id: string) => localStorage.setItem('cartId', id);

export const getAnonymousId = (): string | null => localStorage.getItem('anonymousId');
export const setAnonymousId = (id: string) => localStorage.setItem('anonymousId', id);
