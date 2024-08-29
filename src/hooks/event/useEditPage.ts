import { useState } from 'react';
import { editEvent } from '../../services/event/editEventService';

export const useEditEvent = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleEditEvent = async (eventId: number, eventData: any) => {
		setError(null);
		try {
			const result = await editEvent(eventId, eventData);
			setData(result);
			setMessage('Evento editado com sucesso!');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		}
	};

	return { handleEditEvent, error, data, message };
};
