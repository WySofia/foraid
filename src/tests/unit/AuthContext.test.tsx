// src/tests/AuthContext.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const TestComponent: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();
    return (
        <div>
            <span data-testid="isAuthenticated">
                {isAuthenticated ? 'true' : 'false'}
            </span>
            <span data-testid="loading">{loading ? 'false' : 'true'}</span>
        </div>
    );
};

describe('AuthContext', () => {
    it('proporciona el estado inicial correctamente', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
        expect(screen.getByTestId('loading').textContent).toBe('true');
    });
});
