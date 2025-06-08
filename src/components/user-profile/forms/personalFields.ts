import type { IEditField, IUserProfile } from '../../../types/interfaces';

export type IUserProfileFormFields = Pick<
  IUserProfile,
  'firstName' | 'lastName' | 'dateOfBirth' | 'email'
>;

export const personalFields: IEditField<IUserProfileFormFields>[] = [
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'firstName', label: 'First Name', type: 'text' },
  { key: 'lastName', label: 'Last Name', type: 'text' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
];
