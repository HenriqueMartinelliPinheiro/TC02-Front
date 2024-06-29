import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventService';

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { events, loading, error };
};
