export const updateTokens = async (response: Response) => {
	try {
		const responseData = await response.json();
		const accessTokenExpiration = responseData.accessTokenExpiration;

		localStorage.setItem(
			'accessTokenExpiresAt',
			new Date(accessTokenExpiration).toString()
		);
	} catch (error) {
		throw error;
	}
};
