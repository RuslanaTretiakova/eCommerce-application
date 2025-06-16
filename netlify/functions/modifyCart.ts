import { CTP_PROJECT_KEY, CTP_API_URL } from '../../src/types/constants';

interface ModifyCartInput {
  token: string;
  cartId: string;
  version: number;
  actions: object[];
}


export async function modifyCart({ token, cartId, version, actions }: ModifyCartInput) {
  const response = await fetch(`${CTP_API_URL}/${CTP_PROJECT_KEY}/carts/${cartId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ version, actions }),
  });

  const updatedCart = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(updatedCart),
  };
}
