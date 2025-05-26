import { useEffect } from 'react';
import { useForm, type SubmitHandler, type FieldValues, type Path } from 'react-hook-form';

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
  showAddress: boolean;
}

function DynamicForm<TFormData extends FieldValues>({
  fields,
  onSubmit,
  title,
  submitText,
  showAddress = false,
}: DynamicFormProps<TFormData>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<TFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const sameAddress = watch('sameAddress' as Path<TFormData>) ?? false;

  const addressKeys = ['Street', 'City', 'PostalCode', 'Country'] as const;

  useEffect(() => {
    if (!sameAddress) return;

    const isShippingEmpty = addressKeys.every((key) => {
      const shippingField = `shipping${key}` as Path<TFormData>;
      return !getValues(shippingField);
    });

    if (isShippingEmpty) {
      addressKeys.forEach((key) => {
        const billingField = `billing${key}` as Path<TFormData>;
        const shippingField = `shipping${key}` as Path<TFormData>;
        const billingValue = getValues(billingField);
        setValue(shippingField, billingValue);
      });
    }
  }, [sameAddress, getValues, setValue]);

  const userFields = fields.filter(
    (f) =>
      !f.name.startsWith('billing') &&
      !f.name.startsWith('shipping') &&
      !['sameAddress', 'setDefaultBilling', 'setDefaultShipping'].includes(f.name),
  );

  const billingFields = fields.filter((f) => f.name.startsWith('billing'));
  const shippingFields = fields.filter((f) => f.name.startsWith('shipping'));

  const sameAddressField = fields.find((f) => f.name === 'sameAddress');
  const setDefaultBillingField = fields.find((f) => f.name === 'setDefaultBilling');
  const setDefaultShippingField = fields.find((f) => f.name === 'setDefaultShipping');

  const renderField = (field: IFieldConfig<TFormData>) => {
    const { name, label, type, placeholder, rules, options = [] } = field;
    const { ref, onChange, onBlur, name: fieldName } = register(name, rules);

    switch (type) {
      case 'select':
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

      default:
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
    }
  };

  return (
    <BaseForm
      className="form"
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      title={title}
    >
      <div>{userFields.map(renderField)}</div>

      {showAddress && (
        <>
          <div className="form__address-container">
            <div>
              <h2 className="form__section-title">Billing Address</h2>
              {setDefaultBillingField && renderField(setDefaultBillingField)}
              <div>{billingFields.map(renderField)}</div>
            </div>

            <div className="form__address-block">
              <h2 className="form__section-title">Shipping Address</h2>
              {setDefaultShippingField && renderField(setDefaultShippingField)}
              <div>{shippingFields.map(renderField)}</div>
            </div>
          </div>

          {sameAddressField && renderField(sameAddressField)}
        </>
      )}

      <BaseButton type="submit" className="button--submit" title={title}>
        {submitText}
      </BaseButton>
    </BaseForm>
  );
}

export default DynamicForm;
