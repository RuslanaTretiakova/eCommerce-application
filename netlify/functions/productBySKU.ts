import { Handler } from '@netlify/functions';

import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

const handler: Handler = async (event) => {
  const sku = event.queryStringParameters?.sku;
  const token = event.headers.authorization?.split(' ')[1];

  if (!sku || !token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing sku or token' }),
    };
  }

  const encodedSku = encodeURIComponent(`variants.sku:"${sku}"`);
  const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections/search?filter.query=${encodedSku}&staged=true`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        statusCode: response.status,
        body: errorBody,
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: String(error) }),
    };
  }
};

export { handler };
