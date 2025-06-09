import type { ButtonType, InputType, NotificationType, RegistrationErrorType } from './types';
import type { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import type { ChangeHandler, DefaultValues, FieldValues, Path } from 'react-hook-form';
import type { RegisterOptions } from 'react-hook-form';

// Form
export interface IFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  sameAddress?: boolean;
  setDefaultBilling?: boolean;
  setDefaultShipping?: boolean;
}

// Auth form
export interface IFormDataAuth {
  email: string;
  password: string;
}

export interface IBaseFieldProps<TElement extends HTMLElement = HTMLElement> {
  name: keyof IFormData;
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<TElement>;
  onBlur: FocusEventHandler<TElement>;
  error?: string;
}

export interface IBaseInputProps<TFormData extends FieldValues = FieldValues> {
  name: Path<TFormData>;
  label: string;
  type: string;
  placeholder?: string;
  onChange: ChangeHandler;
  onBlur?: ChangeHandler;
  error?: string;
}

export interface IBaseSelectProps<TFormData extends FieldValues = FieldValues> {
  name: Path<TFormData>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
}

//Button
export interface IBaseButtonProps {
  type: ButtonType;
  children: React.ReactNode;
  className: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

//Notification
export interface INotification {
  text: string;
  type?: NotificationType;
  duration?: number;
  position?: 'left' | 'right' | 'center';
}

//Errors
export interface IJsonSuccessResponse {
  success: true;
  customerId: string;
}

export interface IJsonErrorResponse {
  success: false;
  error: string;
}

export interface ICommercetoolsErrorDetail {
  code: string;
  field?: string;
  message: string;
}

export interface IRegistrationError extends Error {
  code?: RegistrationErrorType;
  statusCode?: number;
  body?: {
    statusCode: number;
    message: string;
    errors?: ICommercetoolsErrorDetail[];
  };
}

export interface IEditableCard {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface IAddress {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

export interface IAddressFormFields {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
}

export interface IUserProfile {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IAddress[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export interface IRawAddress {
  id: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface ICustomerMeResponse {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  defaultBillingAddressId?: string;
  defaultBillingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultShippingAddressIds?: string[];
  addresses?: IRawAddress[];
  [key: string]: unknown;
}

//ProductCard
export interface IProductCard {
  id?: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  discount?: string;
}

//Edit
export interface IEditField<T> {
  key: keyof T;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  rules?: RegisterOptions;
}

export interface IEditFormProps<T extends FieldValues> {
  fields: IEditField<T>[];
  initialValues: DefaultValues<T>;
  onChange: (updated: T) => void;
}
