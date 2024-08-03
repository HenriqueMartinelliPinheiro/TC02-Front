import { API_ROUTES } from '../../config/apiConfig';
import { updateTokens } from './updateTokens';

export const login = async (userEmail: string, userPassword: string) => {
	try {
		const response = await fetch(API_ROUTES.ADMIN_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userEmail, userPassword }),
			credentials: 'include',
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Credenciais inválidas');
			}
			throw new Error('Erro ao fazer login');
		}

		await updateTokens(response);

		const cookies = document.cookie;
	} catch (error) {
		throw error;
	}
};
