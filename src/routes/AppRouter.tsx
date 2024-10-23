// src/router/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import Dashboard from '../pages/Dashboard';

import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/auth" element={<AuthPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
};

export default AppRouter;
