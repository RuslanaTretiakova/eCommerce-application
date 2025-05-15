import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../ui/base-form/BaseForm';
import BaseInput from '../../ui/base-input/BaseInput';
import { registrationFields } from './fieldsConfig';
import type { IFormData } from '../../../types/interfaces';

function RegistrationForm(): JSX.Element {
  const { register, handleSubmit } = useForm<IFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  }); // todo: implement error handling

  const handleRegistrationSubmit = (data: IFormData): void => {
    console.log(data);
  };

  return (
    <BaseForm className="form" onSubmit={handleSubmit(handleRegistrationSubmit)} title="Register">
      {registrationFields.map(({ name, label, type, placeholder, rules }) => {
        const { ref, onChange, onBlur, name: fieldName } = register(name, rules);

        return (
          <BaseInput
            key={fieldName}
            name={fieldName}
            label={label}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        );
      })}
    </BaseForm>
  );
}

export default RegistrationForm;
