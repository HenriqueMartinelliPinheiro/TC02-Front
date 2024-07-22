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
        const accessTokenExpiresAt = response.headers.get('x-access-token-expiration');
        const refreshTokenExpiresAt = response.headers.get('x-refresh-token-expiration');

        if (!accessToken || !refreshToken || !accessTokenExpiresAt || !refreshTokenExpiresAt) {
            throw new Error('Tokens ou tempos de expiração não encontrados nos cabeçalhos');
        }

        return { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt };
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};
    