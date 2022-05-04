module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.test.json'],
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
  },
};
