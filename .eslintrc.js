module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: ['@tanstack/query'],
  rules: {
    // TODO recheck and remove offs
    'no-shadow': 'off',
    'no-nested-ternary': 'warn',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['.*[Rr]ef'],
      },
    ],
    'no-use-before-define': 'off',
    'no-unsafe-optional-chaining': 'warn',
    'no-promise-executor-return': 'warn',
    'no-continue': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_[\\w]+$',
        varsIgnorePattern: '^_[\\w]+$',
        caughtErrorsIgnorePattern: '^_[\\w]+$',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-no-undef': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-key': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-no-constructed-context-values': 'warn',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'warn',
    'react/jsx-no-useless-fragment': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    'react/no-array-index-key': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-this-in-sfc': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'import/newline-after-import': 'warn',
    'import/namespace': 'off',
    'import/no-cycle': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'app/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'entities/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'features/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'shared/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'widgets/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'id-denylist': ['warn', 'err', 'e'],
    'default-param-last': 'off',
    'guard-for-in': 'warn',
    'promise/always-return': 'off',
  },
};
