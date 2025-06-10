import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_AUTH_URL,
  CTP_API_URL,
} from '../../src/types/constants';

const handler: Handler = async (event) => {
  const categories = event.multiValueQueryStringParameters?.category || [];

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
    let whereClause = '';
    if (categories.length > 0) {
      const conditions = categories.map((cat) => `masterData(current(categories(id="${cat}")))`);
      whereClause = conditions.join(' or ');
    }

    const response = await apiRoot
      .withProjectKey({ projectKey: CTP_PROJECT_KEY })
      .products()
      .get({
        queryArgs: {
          limit: 100,
          ...(whereClause && { where: whereClause }),
        },
      })
      .execute();

    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};

export { handler };
