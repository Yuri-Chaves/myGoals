module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    semi: 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-unused-modules': 'error',
  },
  plugins: ['import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            semi: false,
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            arrowParens: 'avoid',
          },
        ],
        'import/order': [
          'error',
          {
            groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
            pathGroups: [
              {
                pattern: 'react+(|-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: './',
                group: 'internal',
                position: 'before',
              },
              {
                pattern:
                  '@+(components|screens|theme|icons|hooks|helpers|routes|services|domain)',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react+(|-native)'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
}
