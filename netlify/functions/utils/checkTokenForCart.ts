import { CTP_AUTH_URL, CTP_CLIENT_ID, CTP_CLIENT_SECRET } from '../../../src/types/constants';

const checkIsAnonumToken = async (token: string): Promise<'/me/carts' | '/carts'> => {
  const introspectionResponse = await fetch(`${CTP_AUTH_URL}/oauth/introspect`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `token=${token}`,
  });

  const introspectionData = await introspectionResponse.json();

  const isAnonymous = introspectionData.scope.includes('customer_id:');

  return isAnonymous ? `/me/carts` : `/carts`;
};

export default checkIsAnonumToken;
