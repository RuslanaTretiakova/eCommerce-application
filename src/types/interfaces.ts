// import type { ButtonType, InputType } from './types';
import type { ButtonType } from './types';
import type { ChangeEventHandler, FocusEventHandler } from 'react';
import type { ChangeHandler, FieldValues, Path } from 'react-hook-form';

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

// export interface IBaseInputProps extends IBaseFieldProps<HTMLInputElement> {
//   type: InputType;
// }
export interface IBaseInputProps<TFormData extends FieldValues = FieldValues> {
  name: Path<TFormData>;
  label: string;
  type: string;
  placeholder?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  error?: string;
}

// export interface IBaseSelectProps extends IBaseFieldProps<HTMLSelectElement> {
//   options: { value: string; label: string }[];
// }
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
