import { apiRoot } from './commercetoolsClient';
import type { CustomerDraft, Customer } from '@commercetools/platform-sdk';
import type { IRegistrationError } from '../types/interfaces.ts';

export const registerCustomer = async (data: CustomerDraft): Promise<Customer> => {
  try {
    const response = await apiRoot.customers().post({ body: data }).execute();
    return response.body.customer;
  } catch (error) {
    const err = error as IRegistrationError;

    const errors = err.body?.errors ?? [];

    const isDuplicateEmail = errors.some((e) => e.code === 'DuplicateField' && e.field === 'email');

    err.code = isDuplicateEmail ? 'EMAIL_EXISTS' : 'INTERNAL_ERROR';

    throw err;
  }
};
