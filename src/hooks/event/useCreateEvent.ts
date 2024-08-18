import { useState } from 'react';
import { createEvent } from '../../services/event/createEventService';

export const useCreateEvent = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleCreateEvent = async (values: {
		eventTitle: string;
		eventStartDate: string;
		eventEndDate: string;
		selectedCoursesIds: number[];
		eventStatus?: string;
	}) => {
		setError(null);
		try {
			const result = await createEvent(values);
			setData(result);
			setMessage('Evento criado com sucesso!');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		}
	};

	return { handleCreateEvent, error, data, message };
};
