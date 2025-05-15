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
    formState: { isValid },
  } = useForm<IFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  }); // todo: implement error handling

  const handleRegistrationSubmit = (data: IFormData): void => {
    console.log(data); //todo add logic transform formdata, api;
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
            ref={ref}
          />
        );
      })}

      <BaseButton
        className="button--submit"
        type="submit"
        title="Create Account"
        onClick={() => console.log('hi')} //todo the same comment like in interface file for BaseButton component;
        disabled={!isValid}
      >
        Create Account
      </BaseButton>
    </BaseForm>
  );
}

export default RegistrationForm;
