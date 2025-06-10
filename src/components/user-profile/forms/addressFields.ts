import type { IEditField } from '../../../types/interfaces';
import type { IAddressFormFields } from './userProfileFormTypes';

export const addressFields: IEditField<IAddressFormFields>[] = [
  {
    key: 'streetName',
    label: 'Street',
    type: 'text',
    placeholder: 'Main Street',
    rules: {
      required: 'Street is required',
      minLength: {
        value: 1,
        message: 'Street must contain at least 1 character',
      },
    },
  },
  {
    key: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'New York',
    rules: {
      required: 'City is required',
      pattern: {
        value: /^[A-Za-z\s]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    key: 'postalCode',
    label: 'Postal Code',
    type: 'text',
    placeholder: '12345',
    rules: {
      required: 'Postal code is required',
      pattern: {
        value: /^(\d{5}(-\d{4})?|\d{2}-\d{3})$/,
        message: 'Invalid postal code format',
      },
    },
  },
  {
    key: 'country',
    label: 'Country',
    type: 'select',
    placeholder: 'Select country...',
    options: [
      { value: 'PL', label: 'Poland' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
    ],
    rules: {
      required: 'Country is required',
      pattern: {
        value: /^[A-Z]{2}$/,
        message: 'Choose country from the list',
      },
    },
  },
  {
    key: 'isDefaultBillingAddress',
    label: 'Set as default billing',
    type: 'checkbox',
    rules: {},
  },
  {
    key: 'isDefaultShippingAddress',
    label: 'Set as default shipping',
    type: 'checkbox',
    rules: {},
  },
];
