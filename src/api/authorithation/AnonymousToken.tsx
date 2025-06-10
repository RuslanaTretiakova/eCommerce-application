import { useEffect } from 'react';
import { useAuth } from './AuthToken';

const fetchAnonymousToken = () => {
  const { isAnonymous, token, setToken } = useAuth();

  useEffect(() => {
    if (!isAnonymous) {
      fetch('/.netlify/functions/anonymousToken')
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
          } else {
            console.error('Token not received', data);
          }
        })
        .catch((error) => console.error('Failed to fetch token', error));
    }
  }, [token, setToken]);
};

export default fetchAnonymousToken;
