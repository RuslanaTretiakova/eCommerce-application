import type { IUserProfile, IAddress } from '../../../types/interfaces';

export type IUserProfileFormFields = Pick<
  IUserProfile,
  'firstName' | 'lastName' | 'dateOfBirth' | 'email'
>;

export type IAddressFormFields = Pick<IAddress, 'streetName' | 'city' | 'postalCode' | 'country'>;

export interface IPasswordFormFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
