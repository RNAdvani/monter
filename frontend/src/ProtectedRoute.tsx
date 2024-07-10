// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth/auth';


const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
  return isAuthenticated() ? {children} : <Navigate to="/login" />;
};

export default ProtectedRoute;
