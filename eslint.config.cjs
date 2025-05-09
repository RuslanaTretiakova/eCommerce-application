module.exports = [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      import: require('eslint-plugin-import'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
      ...require('eslint-plugin-react').configs.recommended.rules,
      ...require('eslint-config-airbnb-base').rules,
      ...require('eslint-config-airbnb/rules/react').rules,
      ...require('eslint-config-airbnb/rules/react-a11y').rules,

      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/react-in-jsx-scope': 'off',
      'import/prefer-default-export': 'off',
      'prettier/prettier': 'warn',
      
    },
    settings: {
      react: {
        version: 'detect', // ✅ Automatically detect React version
      },
    },
  },
];
