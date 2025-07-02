import { useAuth } from '../../api/authorithation/AuthToken';
import { fetchToken } from '../../utils/token/tokenType';

export const useLogout = () => {
  const { setToken } = useAuth();

  const logout = async () => {
    try {
      const { token, scope } = await fetchToken('anonymous');
      setToken(token, scope);
    } catch (error) {
      setToken(null, '');
      console.error('Failed to fetch anonymous token:', error);
    }
  };
  return logout;
};
