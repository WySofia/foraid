// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;
    if (!isAuthenticated && !loading) return <Navigate to="/auth" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
