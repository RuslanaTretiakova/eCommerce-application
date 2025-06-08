import { Handler } from '@netlify/functions';
import { createClient } from '@commercetools/sdk-client-v2';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'cross-fetch';

import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_SCOPE,
} from '../../src/types/constants';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { id, version, currentPassword, newPassword } = JSON.parse(event.body || '{}');

  if (!id || !version || !currentPassword || !newPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  const client = createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: CTP_AUTH_URL,
        projectKey: CTP_PROJECT_KEY,
        credentials: { clientId: CTP_CLIENT_ID, clientSecret: CTP_CLIENT_SECRET },
        scopes: [CTP_SCOPE],
        fetch,
      }),
      createHttpMiddleware({
        host: CTP_API_URL,
        fetch,
      }),
    ],
  });

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: CTP_PROJECT_KEY,
  });

  try {
    const response = await apiRoot
      .customers()
      .password()
      .post({
        body: {
          id,
          version,
          currentPassword,
          newPassword,
        },
      })
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
    };
  } catch (error) {
    const err = error as { statusCode?: number; message?: string; body?: unknown };
    return {
      statusCode: err.statusCode ?? 500,
      body: JSON.stringify({
        message: err.message ?? 'Internal Server Error',
        errors: err.body ?? null,
      }),
    };
  }
};

export { handler };
