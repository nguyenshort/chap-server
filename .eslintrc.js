module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/attribute-hyphenation': 'off',
    'dot-notation': 'off',
    'handle-callback-err': 'off',
    'vue/no-v-html': 'off'
  }
}
