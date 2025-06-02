import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_AUTH_URL,
  CTP_API_URL,
} from '../../src/types/constants';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

const handler: Handler = async () => {
  const client = new ClientBuilder()
    .withProjectKey(CTP_PROJECT_KEY)
    .withClientCredentialsFlow({
      host: CTP_AUTH_URL,
      projectKey: CTP_PROJECT_KEY,
      credentials: {
        clientId: CTP_CLIENT_ID,
        clientSecret: CTP_CLIENT_SECRET,
      },
      fetch,
    })
    .withHttpMiddleware({
      host: CTP_API_URL,
      fetch,
    })
    .build();

  const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

  try {
    const response = await apiRoot
      .withProjectKey({ projectKey: CTP_PROJECT_KEY })
      .products()
      .get()
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};

export { handler };
