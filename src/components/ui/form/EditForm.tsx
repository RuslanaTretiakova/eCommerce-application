import { useForm, type FieldValues } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';
import BaseInput from '../../ui/base-input/BaseInput';
import BaseSelect from '../../ui/base-select/BaseSelect';
import type { IEditFormProps } from '../../../types/interfaces';

type FormRef<T> = {
  trigger: () => Promise<boolean>;
  getValues: () => T;
};

function EditFormInner<T extends FieldValues>(
  { fields, initialValues }: IEditFormProps<T>,
  ref: React.Ref<FormRef<T>>,
) {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<T>({
    defaultValues: initialValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    trigger,
    getValues,
  }));

  return (
    <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
      {fields.map((field) => {
        const { key, label, type, placeholder, rules, options } = field;
        const { ref, onChange: fieldChange, onBlur, name } = register(key, rules);

        if (type === 'select' && options) {
          return (
            <BaseSelect
              key={String(key)}
              name={name}
              label={label}
              options={options}
              placeholder={placeholder}
              onChange={fieldChange}
              onBlur={onBlur}
              ref={ref}
            />
          );
        }

        return (
          <BaseInput
            key={String(key)}
            name={name}
            label={label}
            type={type}
            placeholder={placeholder}
            onChange={fieldChange}
            onBlur={onBlur}
            ref={ref}
            error={errors[key]?.message as string | undefined}
          />
        );
      })}
    </form>
  );
}

const EditForm = forwardRef(EditFormInner) as <T extends FieldValues>(
  props: IEditFormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => ReturnType<typeof EditFormInner>;

export default EditForm;
