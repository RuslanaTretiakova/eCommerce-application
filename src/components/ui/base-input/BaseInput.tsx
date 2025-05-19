import { forwardRef, type JSX } from 'react';
import type { IBaseInputProps } from '../../../types/interfaces';

import './_base-input.scss';

const BaseInput = forwardRef<HTMLInputElement, IBaseInputProps>(
  ({ label, name, type, placeholder, onChange, onBlur, error }, ref): JSX.Element => {
    const hasError = Boolean(error);

    return (
      <div className={`base-input ${hasError ? 'base-input--error' : ''}`}>
        <label htmlFor={name} className="base-input__label">
          {label}
        </label>

        <div className="base-input__wrapper">
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            aria-invalid={hasError}
          />
        </div>

        {hasError && <span className="base-input__error">{error}</span>}
      </div>
    );
  },
);

export default BaseInput;
