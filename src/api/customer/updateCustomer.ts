import type { CustomerUpdateAction } from '@commercetools/platform-sdk';

export const updateCustomerViaApi = async (
  customerId: string,
  version: number,
  actions: CustomerUpdateAction[],
  accessToken: string,
) => {
  const response = await fetch('/.netlify/functions/updateCustomerProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ customerId, version, actions }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update customer');
  }

  return await response.json();
};
