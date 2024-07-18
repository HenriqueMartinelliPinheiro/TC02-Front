import React from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  );
};

export default Input;
