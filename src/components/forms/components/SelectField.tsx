import React from 'react';

interface StatusOption {
  value: number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: StatusOption[];
  id: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options, id }) => {
  return (
    <div>
      <label className="block my-2" htmlFor={id}>{label}</label>
      <select
        name={id}
        value={value}
        id={id}
        className="w-full h-12 bg-gray-300 mb-4 rounded-lg"
        required
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
