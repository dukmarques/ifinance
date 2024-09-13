/* eslint-env node */
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    ignorePatterns: ['Icon*.vue'],
    rules: {
        indent: [
            'error',
            4,
        ],
        'no-console': [
            'warn',
            {
                allow: ['error'],
            },
        ],
        'array-bracket-newline': [
            'error',
            {
                minItems: 2,
                multiline: true,
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
    },
};
