// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  root: true,
  parserOptions: {
    ecmaVersion: 2025,
    sourceType: 'module',
  },
  plugins: {
    vue: eslintPluginVue,
    prettier: eslintPluginPrettier,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn', // warn on console.log
    'no-debugger': 'warn', // warn on debugger
    'vue/multi-word-component-names': 'off', // allow single-word component names
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['node_modules/', '.nuxt/', '.output/', 'dist/'],
})
