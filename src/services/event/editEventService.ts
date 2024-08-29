export const editEvent = async (eventId: number, eventData: any) => {
	try {
		const response = await fetch(`/api/events/${eventId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(eventData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		throw new Error(`Erro ao editar evento, Resposta: ${error}`);
	}
};
