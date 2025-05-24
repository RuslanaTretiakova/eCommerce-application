import { apiRoot } from './commercetoolsClient';
import type { CustomerDraft, Customer } from '@commercetools/platform-sdk';

export const registerCustomer = async (data: CustomerDraft): Promise<Customer> => {
  const response = await apiRoot.customers().post({ body: data }).execute();

  return response.body.customer;
};
