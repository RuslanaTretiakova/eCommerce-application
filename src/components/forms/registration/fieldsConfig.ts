import type { RegisterOptions, Path, FieldValues } from 'react-hook-form';
import type { InputType } from '../../../types/types';
import type { IFormData, IFormDataAuth } from '../../../types/interfaces';
import { isOldEnough } from '../../../utils/formUtils/formatting';

export interface IFieldConfig<TFormData extends FieldValues> {
  name: Path<TFormData>;
  label: string;
  type: InputType;
  placeholder: string;
  rules?: RegisterOptions<TFormData, Path<TFormData>>;
  options?: { value: string; label: string }[];
}

export const registrationFields: IFieldConfig<IFormData>[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example@email.com',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email address',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'At least 8 characters',
    rules: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Minimum 8 characters',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'Must include upper, lower, number',
      },
    },
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Jane',
    rules: {
      required: 'First name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Luo',
    rules: {
      required: 'Last name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: '',
    rules: {
      required: 'Date of birth is required',
      validate: {
        isOldEnough,
      },
    },
  },

  {
    name: 'billingStreet',
    label: 'Billing Street',
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
    name: 'billingCity',
    label: 'Billing City',
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
    name: 'billingPostalCode',
    label: 'Billing Postal Code',
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
    name: 'billingCountry',
    label: 'Billing Country',
    type: 'select',
    placeholder: 'Select country...',
    rules: {
      required: 'Country is required',
      pattern: {
        value: /^[A-Z]{2}$/,
        message: 'Choose country from the list',
      },
    },
    options: [
      { value: 'PL', label: 'Poland' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
    ],
  },

  {
    name: 'shippingStreet',
    label: 'Shipping Street',
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
    name: 'shippingCity',
    label: 'Shipping City',
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
    name: 'shippingPostalCode',
    label: 'Shipping Postal Code',
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
    name: 'shippingCountry',
    label: 'Shipping Country',
    type: 'select',
    placeholder: 'Select country...',
    rules: {
      required: 'Country is required',
      pattern: {
        value: /^[A-Z]{2}$/,
        message: 'Choose country from the list',
      },
    },
    options: [
      { value: 'PL', label: 'Poland' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
    ],
  },
];

export const authenticationFields: IFieldConfig<IFormDataAuth>[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example@email.com',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email address',
      },
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'At least 8 characters',
    rules: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Minimum 8 characters',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'Must include upper, lower, number',
      },
    },
  },
];
