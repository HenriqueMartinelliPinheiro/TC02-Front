import React, { useEffect, useState } from 'react';
import {FormEvent} from '../components/forms/FormEvent';
import { useParams } from 'react-router-dom';

export const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<{ id?: number; name: string; status: number } | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
      } catch (error) {
        console.error('Erro ao buscar evento', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!initialData) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Editar Evento</h1>
      <FormEvent initialData={initialData} />
    </div>
  );
};
