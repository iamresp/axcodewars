module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [resolve(__dirname, './tsconfig.json')]
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks', 'import'],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/space-before-function-paren': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/promise-function-async': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/semi': 'warn',

    'react/button-has-type': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',

    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'comma-style': ['warn', 'last'],
    'computed-property-spacing': ['warn', 'always'],
    'eol-last': ['warn', 'always'],
    'function-call-argument-newline': ['warn', 'consistent'],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'key-spacing': ['warn', { beforeColon: false }],
    'keyword-spacing': ['warn', { before: true }],
    'lines-around-comment': ['warn', { beforeBlockComment: true }],
    'yield-star-spacing': ['warn', 'after'],
    'multiline-ternary': ['warn', 'always-multiline'],
    'max-len': ['warn', { code: 80 }]
  }
};
