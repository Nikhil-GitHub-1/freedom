import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactNative from 'eslint-plugin-react-native';
import configPrettier from 'eslint-config-prettier';

export default [
    // Global ignores (replaces .eslintignore)
    {
        ignores: ['node_modules/**', 'android/**', 'ios/**', 'build/**', 'dist/**', 'coverage/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            'react-native': pluginReactNative,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                'react-native/react-native': true, // Whitelists React Native globals
            },
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
            ...pluginReactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off', // Not needed in modern React
            'react-native/no-unused-styles': 'warn',
            'react-native/split-platform-components': 'error',
            'react-native/no-inline-styles': 'warn',
            'react-native/no-color-literals': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    configPrettier, // Must be last to override formatting rules
];
