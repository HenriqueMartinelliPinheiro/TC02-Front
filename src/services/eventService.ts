import { API_ROUTES } from '../config/apiConfig';

export const fetchEvents = async () => {
  const response = await fetch(API_ROUTES.GET_ALL_EVENTS);

  if (!response.ok) {
    console.error("Resposta não OK:", response);
    throw new Error('Erro ao buscar dados');
  }

  const data = await response.json();

  if (data.success === true) {
    return data.events;
  } else {
    throw new Error('Erro ao buscar Dados');
  }
};

export const createEvent = async (data: { name: string; status: number }) => {
    const response = await fetch(API_ROUTES.CREATE_EVENT, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao cadastrar evento');
    }

    return await response.json();
};

export const updateEvent = async (id: number, data: { name: string; status: number }) => {
    const response = await fetch(API_ROUTES.UPDATE_EVENT(id), {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao atualizar evento');
    }

    return await response.json();
};

export const getEvent = async (id: number) => {
    const response = await fetch(API_ROUTES.GET_EVENT(id));

    if (!response.ok) {
        throw new Error('Erro ao buscar evento');
    }

    return await response.json();
};