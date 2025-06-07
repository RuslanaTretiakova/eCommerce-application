import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/authorithation/AuthToken';
import { fetchToken } from '../../utils/token/token';

export const useLogout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const logout = async () => {
    debugger;
    try {
      const { token, scope } = await fetchToken('anonymous');
      setToken(token, scope);
      navigate('/profile-access-block');
    } catch (error) {
      setToken(null, '');
      console.error('Failed to fetch anonymous token:', error);
      navigate('/profile-access-block');
    }
  };
  return logout;
};
