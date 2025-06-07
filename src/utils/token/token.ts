type TokenResponse = { token: string; scope: string };

type TokenType = 'anonymous' | 'customer';
type CustomerCredentials = { email: string; password: string };

export const fetchToken = async (
  type: TokenType,
  credentials?: CustomerCredentials,
): Promise<TokenResponse> => {
  const endpoint =
    type === 'anonymous' ? '/.netlify/functions/anonymousToken' : '/.netlify/functions/login';

  const fetchOptions: RequestInit =
    type === 'anonymous'
      ? { method: 'POST' }
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        };

  const response = await fetch(endpoint, fetchOptions);
  const data = await response.json();

  if (!response.ok || !data.access_token || !data.scope) {
    const message =
      typeof data?.error_description === 'string'
        ? data.error_description
        : `${type} token request failed.`;
    throw new Error(message);
  }

  return {
    token: data.access_token,
    scope: data.scope,
  };
};
