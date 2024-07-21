import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isAccessTokenValid } = useAuth();
  
  if (!isAuthenticated || !isAccessTokenValid()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
