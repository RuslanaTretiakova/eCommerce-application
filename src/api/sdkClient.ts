import { createClient } from '@commercetools/sdk-client-v2';
import { createAuthMiddlewareForPasswordFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import fetch from 'cross-fetch';

import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_API_URL,
  CTP_AUTH_URL,
  CTP_SCOPE,
} from '../types/constantsCopy';

export const getCustomerApi = (email: string, password: string) => {
  debugger;
  const client = createClient({
    middlewares: [
      createAuthMiddlewareForPasswordFlow({
        host: CTP_AUTH_URL,
        projectKey: CTP_PROJECT_KEY,
        credentials: {
          clientId: CTP_CLIENT_ID,
          clientSecret: CTP_CLIENT_SECRET,
          user: {
            username: email,
            password: password,
          },
        },
        scopes: [CTP_SCOPE],
        fetch,
      }),
      createHttpMiddleware({
        host: CTP_API_URL,
        fetch,
      }),
    ],
  });

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: CTP_PROJECT_KEY,
  });
};
