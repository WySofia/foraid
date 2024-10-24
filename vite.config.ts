import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    test: {
        environment: 'jsdom',
        include: [
            'src/**/*.test.ts',
            'src/**/*.test.tsx',
            'src/**/*.spec.ts',
            'src/**/*.spec.tsx',
        ],
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'src/components/ui/**',
            'src/hooks/**',
            '**/*.config.js',
            'vite.config.ts',
            'src/lib/**/*.ts',
            'src/main.tsx',
            'src/index.tsx',
            'src/App.tsx',
        ],
        coverage: {
            reporter: ['text', 'lcov'],
            reportsDirectory: './coverage',
            exclude: [
                'src/components/ui/button.tsx',
                '**/node_modules/**',
                '**/dist/**',
                'src/components/ui/**',
                'src/hooks/**',
                '**/*.config.js',
                'vite.config.ts',
                'src/lib/**/*.ts',
                'src/main.tsx',
                'src/index.tsx',
                'src/App.tsx',
                'src/**/*.test.ts',
                'src/pages/**',
            ],
        },
    },
});
