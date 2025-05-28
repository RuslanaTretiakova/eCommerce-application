import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

async function getProductList() {
  const authUrl = 'https://auth.europe-west1.gcp.commercetools.com';
  const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';

  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId: import.meta.env.VITE_CTP_CLIENT_ID || '',
        clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || '',
      },
      fetch,
    })
    .withHttpMiddleware({
      host: apiUrl,
      fetch,
    })
    .build();

  const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);

  try {
    const response = await apiRoot.withProjectKey({ projectKey }).products().get().execute();

    console.log(response.body);

    return response.body;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export default getProductList;
