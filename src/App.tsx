import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from '@/routes/AppRouter';
import { AuthProvider } from '@/context/AuthContext';

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRouter />
            </Router>
        </AuthProvider>
    );
};
