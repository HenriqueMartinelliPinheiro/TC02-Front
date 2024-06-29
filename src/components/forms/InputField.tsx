import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, id }) => {
  return (
    <div>
      <label className="block mb-2" htmlFor={id}>{label}</label>
      <input
        type="text"
        value={value}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
