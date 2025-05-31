import { Handler } from '@netlify/functions';

import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

const handler: Handler = async (event) => {
  const id = event.queryStringParameters?.id;
  const authHeader = event.headers.authorization || event.headers.Authorization;

  if (!id || !authHeader) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Product ID or token is missing' }),
    };
  }
  // debugger;
  const token = authHeader.replace('Bearer ', '');
  console.log(token);

  try {
    const apiUrl = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products/${id}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'CommerceTools API error' }),
      };
    }

    const product = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: (error as Error).message }),
    };
  }
};

export { handler };
