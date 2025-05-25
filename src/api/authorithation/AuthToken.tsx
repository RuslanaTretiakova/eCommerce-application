import { createContext, useState, useContext, useMemo } from 'react';

type TokenType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const Token = createContext<TokenType>({
  token: null,
  setToken: () => {},
});

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setTokenState(token);
  };

  const value = useMemo(
    () => ({
      token: tokenState,
      setToken,
    }),
    [tokenState],
  );

  return <Token.Provider value={value}>{children}</Token.Provider>;
}

export const useAuth = () => useContext(Token);
