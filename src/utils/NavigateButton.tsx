import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigateButtonProps {
  route: string;
  buttonText: string;
}

export const NavigateButton: React.FC<NavigateButtonProps> = ({ route, buttonText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <button className='py-4 my-8 bg-green-600 text-white px-4 rounded-xl' onClick={handleClick}>
      {buttonText}
    </button>
  );
};
