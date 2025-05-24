const isBrowser = typeof window !== 'undefined';

export const CTP_CLIENT_ID = isBrowser
  ? (import.meta.env.VITE_CTP_CLIENT_ID as string)
  : (process.env.VITE_CTP_CLIENT_ID as string);

export const CTP_CLIENT_SECRET = isBrowser
  ? (import.meta.env.VITE_CTP_CLIENT_SECRET as string)
  : (process.env.VITE_CTP_CLIENT_SECRET as string);

export const CTP_PROJECT_KEY = isBrowser
  ? (import.meta.env.VITE_CTP_PROJECT_KEY as string)
  : (process.env.VITE_CTP_PROJECT_KEY as string);

export const CTP_SCOPE = isBrowser
  ? (import.meta.env.VITE_CTP_PROJECT_SCOPE as string)
  : (process.env.VITE_CTP_PROJECT_SCOPE as string);

export const CTP_API_URL = isBrowser
  ? (import.meta.env.VITE_CTP_API_URL as string)
  : (process.env.VITE_CTP_API_URL as string);

export const CTP_AUTH_URL = isBrowser
  ? (import.meta.env.VITE_CTP_API_AUTH as string)
  : (process.env.VITE_CTP_API_AUTH as string);
