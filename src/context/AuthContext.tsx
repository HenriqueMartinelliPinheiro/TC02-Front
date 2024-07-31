import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { login as loginService } from '@/services/login/loginService';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
  refreshToken: string | null;
  isAccessTokenValid: () => boolean;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Adicionado estado de loading

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedAccessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
    const storedRefreshTokenExpiresAt = localStorage.getItem('refreshTokenExpiresAt');

    if (storedAccessToken && storedRefreshToken && storedAccessTokenExpiresAt && storedRefreshTokenExpiresAt) {
      const accessTokenExpiresAt = new Date(storedAccessTokenExpiresAt);

      const isTokenValid = accessTokenExpiresAt > new Date();
      if (isTokenValid) {
        setIsAuthenticated(true);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      } else {
        logout();
      }
    }

    setLoading(false); // Concluímos o carregamento dos dados de autenticação
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await loginService(email, password);
      localStorage.setItem('userEmail', email);
      setIsAuthenticated(true);
      setAccessToken(localStorage.getItem('accessToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiresAt');
    localStorage.removeItem('refreshTokenExpiresAt');
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const isAccessTokenValid = (): boolean => {
    const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
    if (accessTokenExpiresAt) {
      return new Date(accessTokenExpiresAt) > new Date();
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, refreshToken, isAccessTokenValid, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
