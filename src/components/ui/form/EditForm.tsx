import { useState, useEffect } from 'react';
import type { IEditFormProps } from '../../../types/interfaces';

function EditForm<T extends Record<string, string>>({
  fields,
  initialValues,
  onChange,
}: IEditFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (key: keyof T, value: string) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    onChange(updated);
  };

  return (
    <form className="edit-form">
      {fields.map((field) => {
        const inputId = field.id ?? `field-${String(field.key)}`;

        return (
          <div className="edit-form__field" key={String(field.key)}>
            <label htmlFor={inputId}>{field.label}</label>
            <input
              id={inputId}
              type={field.type}
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        );
      })}
    </form>
  );
}

export default EditForm;
