import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export const CreateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button onClick={onClick} text="Cadastrar" className="py-2 px-4 bg-green-500 text-white rounded" />
);

export const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button onClick={onClick} text="Editar" className="py-2 px-4 bg-yellow-500 text-white rounded" />
);

export const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button onClick={onClick} text="Excluir" className="py-2 px-4 bg-red-500 text-white rounded" />
);

export const ViewButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Button onClick={onClick} text="Visualizar" className="py-2 px-4 bg-blue-500 text-white rounded" />
  );