import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateEventButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cadastrarEvento');
  };

  return (
    <button className='py-4 my-8 bg-green-600 text-white px-4 rounded-xl' onClick={handleClick}>
      Cadastrar Novo Evento
    </button>
  );
};
