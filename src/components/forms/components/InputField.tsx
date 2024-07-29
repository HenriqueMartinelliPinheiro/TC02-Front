import React from 'react';

interface InputFieldProps {
  label?: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder, id }) => {
  return (
    <div className="my-4">
      {label && <label className="block mb-2" htmlFor={id}>{label}</label>}
      <input
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full h-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        required/>
    </div>
  );
};

export default InputField;
