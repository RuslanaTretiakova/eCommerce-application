import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  // CTP_PROJECT_KEY,
  CTP_SCOPE,
  CTP_AUTH_URL,
} from '../../src/types/constants';

const handler: Handler = async () => {
  try {
    const response = await fetch(`${CTP_AUTH_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: CTP_SCOPE,
      }),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: String(error) }),
    };
  }
};

export { handler };
