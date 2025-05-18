import { forwardRef, type JSX } from 'react';
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
}

const BaseInput = forwardRef(BaseInputInner) as <TFormData extends FieldValues>(
  props: IBaseInputProps<TFormData> & { ref?: React.Ref<HTMLInputElement> },
) => JSX.Element;

export default BaseInput;
