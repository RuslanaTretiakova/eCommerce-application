import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type Client,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions } from '../http-connection/http-connection';

const anonymousAuthMiddlewareOptions = (): ApiRoot => {
  const options: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
      anonymousId: crypto.randomUUID(),
    },
    scopes: [`manage_project:${import.meta.env.VITE_CTP_PROJECT_KEY}`],
    fetch,
  };

  const anonymClient: Client = new ClientBuilder()
    .withProjectKey(import.meta.env.VITE_CTP_PROJECT_KEY || '')
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(anonymClient);
  return apiRoot;
};

export default anonymousAuthMiddlewareOptions;
