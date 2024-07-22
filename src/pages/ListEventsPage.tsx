import React from 'react';
import { EventTable } from '../components/table/eventTable';
import { CreateEventButton } from '../components/CreateEventButton';
import { useFetchEvents } from '../hooks/useFetchEvents';

export const ListEventsPage: React.FC = () => {
  const { events, loading, error } = useFetchEvents();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl bg-green-200 my-4 px-4 py-2 rounded-lg">Eventos</h1>
      <EventTable eventList={events} />
      <CreateEventButton />
    </div>
  );
};