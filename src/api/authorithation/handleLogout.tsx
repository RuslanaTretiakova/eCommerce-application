import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/authorithation/AuthToken';

export const useLogout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const logout = () => {
    setToken(null);
    navigate('/profile-access-block');
  };
  return logout;
};
