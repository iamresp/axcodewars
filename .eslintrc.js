module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs,jsx,ts,tsx}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
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
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/indent': ['warn', 2],

    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react-hooks/exhaustive-deps': 'off',

    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'block-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'comma-style': ['warn', 'last'],
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
    'max-len': ['warn', { code: 80 }, { "ignoreRegExpLiterals": true }],
    'no-restricted-imports': ['warn', { patterns: ['../../*'] }],
    'newline-before-return': ['warn'],
    'no-eval': 'off'
  }
}
