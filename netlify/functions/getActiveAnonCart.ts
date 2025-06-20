import { Handler } from '@netlify/functions';
import fetch from 'cross-fetch';
import { createClient } from '@commercetools/sdk-client-v2';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const authHeader = event.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Missing or invalid Authorization header' }),
    };
  }

  const token = authHeader.replace('Bearer ', '');

  const client = createClient({
    middlewares: [
      createHttpMiddleware({ host: CTP_API_URL, fetch }),
      (next) => (request, response) => {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`,
        };
        return next(request, response);
      },
    ],
  });

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: CTP_PROJECT_KEY,
  });

  try {
    const result = await apiRoot.me().activeCart().get().execute();

    return {
      statusCode: 200,
      body: JSON.stringify(result.body),
    };
  } catch (error) {
    console.error('Error fetching active anon cart:', error);
    return {
      statusCode: 204,
      body: JSON.stringify({ message: 'No active cart found' }),
    };
  }
};

export { handler };