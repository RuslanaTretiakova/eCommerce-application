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

const fetchSubcategories = async (
  apiRoot: ApiRoot,
  projectKey: string,
  parentId: string,
): Promise<string[]> => {
  const response = await apiRoot
    .withProjectKey({ projectKey })
    .categories()
    .get({ queryArgs: { where: `parent(id="${parentId}")` } })
    .execute();

  const categories = response.body.results;
  let allIds = categories.map((cat) => cat.id);

  for (const cat of categories) {
    const childIds = await fetchSubcategories(apiRoot, projectKey, cat.id);
    allIds = allIds.concat(childIds);
  }

  return allIds;
};

const handler: Handler = async (event) => {
  const category = event.queryStringParameters?.category || '';
  console.log(category);
  console.log('request');
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
    const subcategoryIds = await fetchSubcategories(apiRoot, CTP_PROJECT_KEY, category);
    const categoryFilterIds = [category, ...subcategoryIds];

    const categoryFilter = `categories.id:${categoryFilterIds.map((id) => `"${id}"`).join(',')}`;

    const response = await apiRoot
      .withProjectKey({ projectKey: CTP_PROJECT_KEY })
      .productProjections()
      .search()
      .get({ queryArgs: { 'filter.query': [categoryFilter] } })
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
