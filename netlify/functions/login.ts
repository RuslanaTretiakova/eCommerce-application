import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_SCOPE,
  CTP_AUTH_URL,
} from '../../src/types/constantsCopy';

const handler: Handler = async (e) => {
  const { email, password } = JSON.parse(e.body || '{}');
  debugger;
  const authUrl = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token`;
  const clientId = CTP_CLIENT_ID;
  const clientSecret = CTP_CLIENT_SECRET;

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope: CTP_SCOPE,
    }),
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
};

export { handler };
