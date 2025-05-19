import type { ButtonType, InputType } from './types';
import type { ChangeEventHandler, FocusEventHandler } from 'react';

// Form
export interface IFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IBaseFieldProps<TElement extends HTMLElement = HTMLElement> {
  name: keyof IFormData;
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<TElement>;
  onBlur: FocusEventHandler<TElement>;
  error?: string;
}

export interface IBaseInputProps extends IBaseFieldProps<HTMLInputElement> {
  type: InputType;
}

export interface IBaseSelectProps extends IBaseFieldProps<HTMLSelectElement> {
  options: { value: string; label: string }[];
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
