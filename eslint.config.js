import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },
]
