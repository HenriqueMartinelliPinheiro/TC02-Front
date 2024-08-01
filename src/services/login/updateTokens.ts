export const updateTokens = async (response: Response) => {
    try {
    const accessTokenHeader = response.headers.get('x-access-token') ?? '';
    const accessTokenExpirationHeader = response.headers.get('x-access-token-expiration') ?? '';

    localStorage.setItem('accessToken', accessTokenHeader);
    
    localStorage.setItem('accessTokenExpiresAt', new Date(accessTokenExpirationHeader).toString());

    }catch (error) {
     throw error;   
    }
}