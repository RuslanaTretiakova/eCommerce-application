import { useEffect, useState } from 'react';
import '../ui/filter/filter-by-type.scss';

export type Option = {
  value: string;
  label: string;
};

interface FilterCheckboxProps {
  name: string;
  optionsCheckbox: Option[];
  onChange: (selected: string[]) => void;
}

function FilterCheckbox({ name, optionsCheckbox, onChange }: FilterCheckboxProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  console.log(optionsCheckbox);

  const handleToggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelected);

    onChange?.(newSelected);
  };

  useEffect(() => {
    console.log('Updated selectedValues:', selectedValues);
  }, [selectedValues]);

  return (
    <div className="filter-by-type">
      <h4>
        Filter by
        {' ' + name}
      </h4>
      <div className="checkbox-list">
        {optionsCheckbox.map((option) => {
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

export default FilterCheckbox;
