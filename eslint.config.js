import airbnbExtendedModule from 'eslint-config-airbnb-extended';

// Assuming airbnbExtendedModule.default is the array of configs as per flat config standards
const airbnbConfigs = airbnbExtendedModule.default;

export default [
  ...(airbnbConfigs || []), // Spread it, or an empty array if it's null/undefined
  {
    // It's possible airbnbExtended already configures the parser for ts/tsx files.
    // If errors persist regarding tsconfig.json or parser, we might need to re-add specific languageOptions here.
    // For now, let's assume airbnbExtended handles it or we configure it broadly.
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname, // Use import.meta.dirname for ES modules
      },
    },
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    rules: {
      'no-console': 'error',
      'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-infix-ops': 'error',
      // Add any other specific rules from Airbnb you want to test for auto-fix
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'venv/',
      'coverage/',
      '*.html',
      'css/',
      '*.py',
      // 'js/test-lint.js', // Temporarily ignore for testing other setup parts if needed
    ],
  }
]; 