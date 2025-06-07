import { createContext, useState, useContext, useMemo } from 'react';

type TokenType = {
  token: string | null;
  scope: string;
  setToken: (token: string | null, scope?: string) => void;
  isAnonymous: boolean;
};

const Token = createContext<TokenType>({
  token: null,
  scope: '',
  setToken: () => {},
  isAnonymous: true,
});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [scopeState, setScopeState] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const setToken = (token: string | null, scope = '') => {
    setTokenState(token);
    setScopeState(scope);
    setIsAnonymous(!scope.includes('customer_id'));
  };

  const value = useMemo(
    () => ({
      token: tokenState,
      scope: scopeState,
      setToken,
      isAnonymous,
    }),
    [tokenState, scopeState, isAnonymous],
  );

  return <Token.Provider value={value}>{children}</Token.Provider>;
}

export const useAuth = () => useContext(Token);
