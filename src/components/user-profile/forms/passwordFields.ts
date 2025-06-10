import type { IEditField } from '../../../types/interfaces';

export interface IPasswordFormFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const passwordFields: IEditField<IPasswordFormFields>[] = [
  {
    key: 'currentPassword',
    label: 'Current Password',
    type: 'password',
    placeholder: 'Enter current password',
    rules: {
      required: 'Current password is required',
      minLength: {
        value: 8,
        message: 'Minimum 8 characters',
      },
    },
  },
  {
    key: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: 'At least 8 characters',
    rules: {
      required: 'New password is required',
      minLength: {
        value: 8,
        message: 'Minimum 8 characters',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'Must include uppercase, lowercase, and number',
      },
    },
  },
  {
    key: 'confirmPassword',
    label: 'Confirm New Password',
    type: 'password',
    placeholder: 'Confirm new password',
    rules: {
      required: 'Please confirm your new password',
      validate: {
        matchesPassword: (_, allValues) =>
          allValues?.newPassword === allValues?.confirmPassword || 'Passwords do not match',
      },
    },
  },
];
