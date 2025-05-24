import { createClient } from '@commercetools/sdk-client-v2';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'cross-fetch';

import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_SCOPE,
  CTP_API_URL,
  CTP_AUTH_URL,
} from '../types/constants';

export const apiRoot = createApiBuilderFromCtpClient(
  createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: CTP_AUTH_URL,
        projectKey: CTP_PROJECT_KEY,
        credentials: {
          clientId: CTP_CLIENT_ID,
          clientSecret: CTP_CLIENT_SECRET,
        },
        scopes: [CTP_SCOPE],
        fetch,
      }),
      createHttpMiddleware({
        host: CTP_API_URL,
        fetch,
      }),
    ],
  }),
).withProjectKey({
  projectKey: CTP_PROJECT_KEY,
}); // created folloving this docs https://docs.commercetools.com/sdk/ts-sdk-getting-started;
