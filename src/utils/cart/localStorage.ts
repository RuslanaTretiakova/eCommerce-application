export const getCartId = (): string | null => localStorage.getItem('cartId');
export const setCartId = (id: string) => localStorage.setItem('cartId', id);

export const getAnonymousId = (): string | null => localStorage.getItem('anonymousId');
export const setAnonymousId = (id: string) => localStorage.setItem('anonymousId', id);

export const getCartVersion = (): number | null => {
  const version = localStorage.getItem('cartVersion');
  return version ? Number(version) : null;
};

export const setCartVersion = (version: number) =>
  localStorage.setItem('cartVersion', version.toString());

export const generateAnonymousId = (): string =>
  'anon-' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
