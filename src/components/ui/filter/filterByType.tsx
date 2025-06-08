import { useState } from 'react';
import './filter-by-type.scss';

type Option = {
  value: string;
  label: string;
};

type FilterByTypeProps = {
  onChange: (selected: string[]) => void;
};

const options: Option[] = [
  { value: 'd3c1ee8c-ae88-4bc6-96d9-a99268ce9c33', label: 'Road Bikes' },
  { value: '5a05f0ea-a6a3-45f9-9d5f-29e79bb0099d', label: 'E-Bikes' },
  { value: '0bc1db76-5e11-4148-bc9e-79c1bf65f1bd', label: 'Mountain Bikes' },
  { value: '772e4169-58e1-4abd-9b02-be79d38ef935', label: 'Folding Bikes' },
  { value: 'c09916a0-2fab-4882-a2b3-41a4a482b171', label: 'City Bikes' },
];

function FilterByType({ onChange = () => {} }: FilterByTypeProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleToggleOption = (value: string) => {
    console.log(value);
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="filter-by-type">
      <h4>Filter by Type</h4>
      <div className="checkbox-list">
        {options.map((option) => {
          const inputId = `filter-${option.value}`;
          return (
            <label key={option.value} htmlFor={inputId} className="checkbox-option">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggleOption(option.value)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default FilterByType;
