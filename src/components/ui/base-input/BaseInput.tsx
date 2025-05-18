import { forwardRef, type JSX } from 'react';
import { useState } from 'react';
import type { IBaseInputProps } from '../../../types/interfaces';

import type { FieldValues } from 'react-hook-form';

import './_base-intut.scss';

// const BaseInput = forwardRef<HTMLInputElement, IBaseInputProps>(
//   ({ label, name, type, placeholder, onChange, onBlur }, ref): JSX.Element => {
//     return (
//       <div className="base-input">
//         <label htmlFor={name} className="base-input__label">
//           {label}
//         </label>
//         <input
//           id={name}
//           name={name}
//           type={type}
//           placeholder={placeholder}
//           onChange={onChange}
//           onBlur={onBlur}
//           ref={ref}
//         />
//       </div>
//     );
//   },
// );

// export default BaseInput;

function BaseInputInner<TFormData extends FieldValues>(
  { label, name, type, placeholder, onChange, onBlur }: IBaseInputProps<TFormData>,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className="base-input">
      <label htmlFor={name} className="base-input__label">
        {label}
      </label>
      <div className="base-input__wrapper">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
        {isPasswordType && (
          <button
            type="button"
            className="base-input__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
        )}
      </div>
    </div>
  );
}

const BaseInput = forwardRef(BaseInputInner) as <TFormData extends FieldValues>(
  props: IBaseInputProps<TFormData> & { ref?: React.Ref<HTMLInputElement> },
) => JSX.Element;

export default BaseInput;
