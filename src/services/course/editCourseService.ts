import { API_ROUTES } from '../../config/apiConfig';

export const editCourse = async (
	courseName: string,
	courseCoordinatorEmail: string,
	courseId: number
) => {
	try {
		const response = await fetch(API_ROUTES.EDIT_COURSE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				courseName,
				courseCoordinatorEmail,
				courseId,
			}),
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Erro ao Criar Curso, Resposta: ${error}`);
	}
};
