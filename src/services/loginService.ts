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
            console.log("Resposta não OK:", response);
            throw new Error('Erro ao fazer login');
        }

        const accessToken = response.headers.get('x-access-token');
        const refreshToken = response.headers.get('x-refresh-token');
        const accessTokenExpiresAt = response.headers.get('x-access-token-expiration');
        const refreshTokenExpiresAt = response.headers.get('x-refresh-token-expiration');

        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("accessTokenExpiresAt:", accessTokenExpiresAt);
        console.log("refreshTokenExpiresAt:", refreshTokenExpiresAt);
        
        if (!accessToken || !refreshToken || !accessTokenExpiresAt || !refreshTokenExpiresAt) {
            throw new Error('Tokens ou tempos de expiração não encontrados nos cabeçalhos');
        }

        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("accessTokenExpiresAt:", accessTokenExpiresAt);
        console.log("refreshTokenExpiresAt:", refreshTokenExpiresAt);

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessTokenExpiresAt', new Date(accessTokenExpiresAt).toString());
        localStorage.setItem('refreshTokenExpiresAt', new Date(refreshTokenExpiresAt).toString());

        return { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt };
    } catch (error) {
        console.log("Erro ao fazer login:", error);
        throw new Error('Erro ao fazer login');
    }
};
