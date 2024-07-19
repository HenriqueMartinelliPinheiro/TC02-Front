// services/loginService.ts
import { API_ROUTES } from '../config/apiConfig';

export const login = async (userEmail: string, userPassword: string) => {
    try {
        const response = await fetch(API_ROUTES.ADMIN_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, userPassword }),
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const accessToken = response.headers.get('x-access-token');
        const refreshToken = response.headers.get('x-refresh-token');

        if (!accessToken || !refreshToken) {
            throw new Error('Tokens não encontrados nos cabeçalhos');
        }
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // sessionStorage.setItem('accessToken', accessToken);
        // sessionStorage.setItem('refreshToken', refreshToken);
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
}
