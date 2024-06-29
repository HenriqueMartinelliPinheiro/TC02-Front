import { useState } from 'react';
import { createEvent, updateEvent } from '../services/eventService';

interface UseFormEventProps {
  initialData?: { id?: number; name: string; status: number };
}

export const useFormEvent = ({ initialData }: UseFormEventProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [status, setStatus] = useState(initialData?.status || 0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name, status };

    try {
      let result;
      if (initialData?.id) {
        result = await updateEvent(initialData.id, data);
        setAlertMessage(result.msg || 'Evento atualizado com sucesso!');
      } else {
        result = await createEvent(data);
        setAlertMessage(result.msg || 'Evento cadastrado com sucesso!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(error.message || 'Erro ao processar o evento. Tente novamente.');
      } else {
        setAlertMessage('Erro desconhecido ao processar o evento. Tente novamente.');
      }
    }

    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return {
    name,
    setName,
    status,
    setStatus,
    showAlert,
    alertMessage,
    handleSubmit,
    handleCloseAlert,
  };
};
