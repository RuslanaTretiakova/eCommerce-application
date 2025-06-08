import type { IEditField } from '../../../types/interfaces';
import type { IUserProfileFormFields } from './userProfileFormTypes';
import { isOldEnough } from '../../../utils/formUtils/formatting';

export const personalFields: IEditField<IUserProfileFormFields>[] = [
  {
    key: 'email',
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
    key: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'John',
    rules: {
      required: 'First name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Doe',
    rules: {
      required: 'Last name is required',
      pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Only letters allowed',
      },
    },
  },
  {
    key: 'dateOfBirth',
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
];
