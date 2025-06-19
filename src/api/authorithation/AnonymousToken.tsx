import { useEffect } from 'react';
import { useAuth } from './AuthToken';
import { getAnonymousId, generateAnonymousId, setAnonymousId } from '../../utils/cart/localStorage';

const fetchAnonymousToken = () => {
  const { isAnonymous, token, setToken } = useAuth();

  useEffect(() => {
    if (!isAnonymous || token) return;

    let anonymousId = getAnonymousId();
    if (!anonymousId) {
      anonymousId = generateAnonymousId();
      setAnonymousId(anonymousId);
    }

    fetch('/.netlify/functions/anonymousToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anonymousId }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data.access_token) {
          setToken(data.access_token, 'anonymous');
        } else {
          console.error('Token not received:', data);
        }
      })
      .catch((error) => console.error('Failed to fetch anonymous token:', error));
  }, [isAnonymous, token, setToken]);
};

export default fetchAnonymousToken;
