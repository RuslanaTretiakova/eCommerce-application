import { forwardRef, type JSX } from 'react';
import { useState } from 'react';
import type { IBaseInputProps } from '../../../types/interfaces';
import type { FieldValues } from 'react-hook-form';

import './_base-input.scss';

function BaseInputInner<TFormData extends FieldValues>(
  { label, name, type, placeholder, onChange, onBlur, error }: IBaseInputProps<TFormData>,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  const hasError = Boolean(error);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const isCheckbox = type === 'checkbox';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div
      className={`base-input ${hasError ? 'base-input--error' : ''} ${
        isCheckbox ? 'base-input--inline' : ''
      }`}
    >
      {!isCheckbox && (
        <label htmlFor={name} className="base-input__label">
          {label}
        </label>
      )}

      <div className="base-input__wrapper">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={!isCheckbox ? placeholder : undefined}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          aria-invalid={hasError}
        />

        {isCheckbox && (
          <label htmlFor={name} className="base-input__label">
            {label}
          </label>
        )}

        {isPasswordType && (
          <button
            type="button"
            className="base-input__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
        )}

        {hasError && <span className="base-input__error">{error}</span>}
      </div>
    </div>
  );
}

const BaseInput = forwardRef(BaseInputInner) as <TFormData extends FieldValues>(
  props: IBaseInputProps<TFormData> & { ref?: React.Ref<HTMLInputElement> },
) => JSX.Element;

export default BaseInput;
