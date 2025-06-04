import { Handler } from '@netlify/functions';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../src/types/constants';

export const handler: Handler = async (event) => {
  const authHeader = event.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Missing or invalid token' }),
    };
  }

  const token = authHeader.replace('Bearer ', '');

  const res = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
