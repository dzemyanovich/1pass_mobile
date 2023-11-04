module.exports = {
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jest',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'arrow-parens': 'off',
    'jsx-a11y/no-autofocus': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/default-param-last': 'off',
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false,
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'prettier/prettier': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'import/extensions': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['*.test.ts', '*.test.tsx', '*.js'],
};
