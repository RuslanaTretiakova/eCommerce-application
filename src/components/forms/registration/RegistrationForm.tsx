import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../ui/base-form/BaseForm';
import BaseInput from '../../ui/base-input/BaseInput';
import BaseSelect from '../../ui/base-select/BaseSelect';
import BaseButton from '../../ui/base-button/BaseButton';
import { registrationFields } from './fieldsConfig';
import type { IFormData } from '../../../types/interfaces';

function RegistrationForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  }); // todo: implement error handling

  const handleRegistrationSubmit = (data: IFormData): void => {
    console.log(data); //todo add logic transform formdata, api, remove whitespases;
  };

  return (
    <BaseForm className="form" onSubmit={handleSubmit(handleRegistrationSubmit)} title="Register">
      {registrationFields.map((field) => {
        const { name, label, type, placeholder, rules, options = [] } = field;

        const { ref, onChange, onBlur, name: fieldName } = register(name, rules);

        if (type === 'select') {
          return (
            <BaseSelect
              key={name}
              name={fieldName}
              label={label}
              options={options}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              ref={ref}
            />
          );
        }

        return (
          <BaseInput
            key={name}
            name={fieldName}
            label={label}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            error={errors[name]?.message}
            ref={ref}
          />
        );
      })}

      <BaseButton type="submit" className="button--submit" title="Create Account">
        Create Account
      </BaseButton>
    </BaseForm>
  );
}

export default RegistrationForm;
