import { Handler } from '@netlify/functions';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../../src/types/constants';
import { ICustomerMeResponse, IRawAddress } from '../../src/types/interfaces';

export const handler: Handler = async (event) => {
  const authHeader = event.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Missing or invalid token' }),
    };
  }

  const token = authHeader.replace('Bearer ', '');

  const res = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const data: ICustomerMeResponse = await res.json();

  if (!res.ok) {
    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    };
  }

  const billingId = data.defaultBillingAddressId;
  const shippingId = data.defaultShippingAddressId;

  const enrichedAddresses = (data.addresses || []).map(
    (
      addr,
    ): IRawAddress & {
      isDefaultBillingAddress: boolean;
      isDefaultShippingAddress: boolean;
    } => ({
      ...addr,
      isDefaultBillingAddress: addr.id === billingId,
      isDefaultShippingAddress: addr.id === shippingId,
    }),
  );

  const response = {
    ...data,
    addresses: enrichedAddresses,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
