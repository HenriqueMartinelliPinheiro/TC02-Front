import { API_ROUTES } from '../../config/apiConfig';

export const fetchCoursesService = async () => {
	try {
		const response = await fetch(API_ROUTES.FETCH_ALL_COURSES, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},

			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('Erro na requisição');
		}

		const data = await response.json();
		return data.courses;
	} catch (error) {
		throw error;
	}
};
