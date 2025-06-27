module.exports = [
  {
    ignores: ['node_modules/**', 'output/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: { jest: 'readonly' },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      'eqeqeq': 'warn',
      'curly': 'warn',
      'semi': 'warn',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    files: ['src/**/*.js', 'test/**/*.js'],
  },
]; 