module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier', 'prettier/vue', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'prettier/prettier': ['error', { semi: false }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }]
  }
}
