import type { IAddress } from '../../../types/interfaces';

export const createDefaultAddress = (type: 'billing' | 'shipping'): IAddress => ({
  id: crypto.randomUUID(),
  streetName: '',
  city: '',
  postalCode: '',
  country: '',
  isDefaultBillingAddress: type === 'billing',
  isDefaultShippingAddress: type === 'shipping',
});
