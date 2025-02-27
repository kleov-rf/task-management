module.exports = {
    env: { node: true, browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    rules: {
        'prettier/prettier': 'warn',
        'vue/multi-word-component-names': 'off' // Optional
    }
};
