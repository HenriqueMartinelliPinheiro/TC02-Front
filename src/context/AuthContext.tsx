import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as loginService } from '@/services/login/loginService';

interface AuthContextData {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAccessTokenValid: () => boolean;
	loading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedAccessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
		if (storedAccessTokenExpiresAt) {
			const accessTokenExpiresAt = new Date(storedAccessTokenExpiresAt);
			const isTokenValid = accessTokenExpiresAt > new Date();
			if (isTokenValid) {
				setIsAuthenticated(true);
			} else {
				logout();
			}
		}
		setLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		try {
			await loginService(email, password);
			localStorage.setItem('userEmail', email);
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('accessTokenExpiresAt');
		setIsAuthenticated(false);
	};

	const isAccessTokenValid = (): boolean => {
		const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
		if (accessTokenExpiresAt) {
			return new Date(accessTokenExpiresAt) > new Date();
		}
		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login,
				logout,
				isAccessTokenValid,
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
