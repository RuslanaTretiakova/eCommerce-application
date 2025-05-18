import { forwardRef, type JSX } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { IBaseSelectProps } from '../../../types/interfaces';

import '../base-input/_base-intut.scss';

// const BaseSelect = forwardRef<HTMLSelectElement, IBaseSelectProps>(
//   ({ name, label, options, onChange, onBlur, placeholder }, ref): JSX.Element => {
//     return (
//       <div className="base-input">
//         <label htmlFor={name} className="base-input__label">
//           {label}
//         </label>
//         <select
//           id={name}
//           name={name}
//           onChange={onChange}
//           onBlur={onBlur}
//           ref={ref}
//           className="base-input__select"
//         >
//           <option value="">{placeholder}</option>
//           {options.map(({ value, label }) => (
//             <option key={value} value={value}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   },
// );

// export default BaseSelect;

function BaseSelectInner<TFormData extends FieldValues>(
  { name, label, options, onChange, onBlur, placeholder }: IBaseSelectProps<TFormData>,
  ref: React.Ref<HTMLSelectElement>,
): JSX.Element {
  return (
    <div className="base-input">
      <label htmlFor={name} className="base-input__label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        className="base-input__select"
      >
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

const BaseSelect = forwardRef(BaseSelectInner) as <TFormData extends FieldValues>(
  props: IBaseSelectProps<TFormData> & { ref?: React.Ref<HTMLSelectElement> },
) => JSX.Element;

export default BaseSelect;
