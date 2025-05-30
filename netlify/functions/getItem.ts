import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Product ID is missing' }),
    };
  }

  try {
    const token = 'wM2dm6fRmwQnuiBqynIHYz6LBpdP_WmO';

    const apiUrl = `https://api.europe-west1.gcp.commercetools.com/reactive_2025/products/${id}`;
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
