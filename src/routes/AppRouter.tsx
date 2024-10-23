// src/router/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from '../pages/auth/AuthPage';

import ProtectedRoute from './ProtectedRoute';

import GalleryCasoPage from '@/pages/casos/GalleryCasoPage';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/casos" replace />} />

            <Route path="/auth" element={<AuthPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/casos" element={<GalleryCasoPage />} />
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
};

export default AppRouter;
