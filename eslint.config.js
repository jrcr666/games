import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.jest },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'react-refresh/only-export-components': 'off',
      eqeqeq: 'error',
      quotes: ['warn', 'single'],
      'no-multi-spaces': 'warn',
      'no-trailing-spaces': 'warn',
      indent: ['warn', 2],
      'key-spacing': 'warn',
      'object-curly-spacing': ['warn', 'always'],
      'no-whitespace-before-property': 'warn',
      'comma-spacing': ['warn', { before: false, after: true }],
      'arrow-spacing': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      semi: ['error', 'always'],
      'computed-property-spacing': ['error', 'never'],
      'require-await': 'error',
      'space-infix-ops': 'warn',
    },
  },
];
