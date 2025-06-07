import type { IAddress, IEditField } from '../../../types/interfaces';

export type IAddressFormFields = Pick<IAddress, 'streetName' | 'city' | 'postalCode' | 'country'>;

export const addressFields: IEditField<IAddressFormFields>[] = [
  { key: 'streetName', label: 'Street Name', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'postalCode', label: 'Postal Code', type: 'text' },
  { key: 'country', label: 'Country', type: 'text' },
];
