export const updateTokens = async (response: Response) => {
    try {
    const accessTokenHeader = response.headers.get('x-access-token') ?? '';
    const refreshTokenHeader = response.headers.get('x-refresh-token') ?? '';
    const accessTokenExpirationHeader = response.headers.get('x-access-token-expiration') ?? '';
    const refreshTokenExpirationHeader = response.headers.get('x-refresh-token-expiration') ?? '';

    localStorage.setItem('accessToken', accessTokenHeader);
    localStorage.setItem('refreshToken', refreshTokenHeader);
    
    localStorage.setItem('accessTokenExpiresAt', new Date(accessTokenExpirationHeader).toString());

    localStorage.setItem('refreshTokenExpiresAt', new Date(refreshTokenExpirationHeader).toString());
    }catch (error) {
     throw error;   
    }
}