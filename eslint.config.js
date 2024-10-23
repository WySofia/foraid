import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import _import from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended'
        )
    ),
    {
        ignores: [
            'node_modules',
            'eslint.config.js',
            'tsconfig.json',
            'tailwind.config.js',
            'postcss.config.js',
            'src/components/*',
            'src/hooks/*',
            'src/tests/*',
        ],
    },
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            'react': fixupPluginRules(react),
            'react-hooks': fixupPluginRules(reactHooks),
            'import': fixupPluginRules(_import),
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },

                project: './tsconfig.json',
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'react/react-in-jsx-scope': 'off',

            'react/jsx-no-leaked-render': [
                'error',
                {
                    validStrategies: ['ternary'],
                },
            ],

            'react/no-unused-prop-types': 'error',

            'react/jsx-filename-extension': [
                'warn',
                {
                    extensions: ['.tsx'],
                },
            ],

            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                },
            ],

            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            'no-trailing-spaces': 'error',
            'no-underscore-dangle': 'error',
            'no-console': 'error',
        },
    },
];
