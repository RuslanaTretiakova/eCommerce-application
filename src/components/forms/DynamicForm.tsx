import type { JSX } from 'react';
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';

import BaseForm from '../../components/ui/base-form/BaseForm';
import BaseInput from '../../components/ui/base-input/BaseInput';
import BaseSelect from '../../components/ui/base-select/BaseSelect';
import BaseButton from '../../components/ui/base-button/BaseButton';

import type { IFieldConfig } from '../../components/forms/registration/fieldsConfig';

interface DynamicFormProps<TFormData extends FieldValues> {
  fields: IFieldConfig<TFormData>[];
  onSubmit: SubmitHandler<TFormData>;
  title: string;
  submitText: string;
}

function DynamicForm<TFormData extends FieldValues>({
  fields,
  onSubmit,
  title,
  submitText,
}: DynamicFormProps<TFormData>): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <BaseForm className="form" onSubmit={handleSubmit(onSubmit)} title={title}>
      {fields.map((field) => {
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
            error={errors[name]?.message as string | undefined}
            ref={ref}
          />
        );
      })}

      <BaseButton type="submit" className="button--submit" title={title}>
        {submitText}
      </BaseButton>
    </BaseForm>
  );
}

export default DynamicForm;
