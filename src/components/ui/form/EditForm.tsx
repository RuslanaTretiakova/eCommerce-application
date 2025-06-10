import { useForm, type FieldValues, type Path } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';
import BaseInput from '../../ui/base-input/BaseInput';
import BaseSelect from '../../ui/base-select/BaseSelect';
import type { IEditFormProps } from '../../../types/interfaces';
import type { RegisterOptions } from 'react-hook-form';

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
        const {
          ref: inputRef,
          onChange,
          onBlur,
          name,
        } = register(key as Path<T>, rules as unknown as RegisterOptions<T, Path<T>>);

        const error = errors[key as keyof T]?.message as string | undefined;

        if (type === 'select' && options) {
          return (
            <BaseSelect
              key={String(key)}
              name={name}
              label={label}
              options={options}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              ref={inputRef}
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
            onChange={onChange}
            onBlur={onBlur}
            ref={inputRef}
            error={error}
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
