import React, { forwardRef, type JSX } from 'react';
import type { InputType } from '../../../types/types';
import type { IFormData } from '../../../types/interfaces';

import './_base-intut.scss'; //todo add styles

interface IBaseInputProps {
  name: keyof IFormData;
  label: string;
  type: InputType;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

const BaseInput = forwardRef<HTMLInputElement, IBaseInputProps>(
  ({ label, name, type, placeholder, onChange, onBlur }, ref): JSX.Element => {
    return (
      <div className="base-input">
        <label htmlFor={name} className="base-input__label">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
    );
  },
);

export default BaseInput;
