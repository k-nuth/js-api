module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: ['airbnb-base', 'plugin:prettier/airbnb-base'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        "prettier/prettier": [
            "error",
            {},
            {
              "usePrettierrc": true
            }
        ],
        'linebreak-style': 0,
        'no-console': 0,
        'no-use-before-define': 0,
        'no-bitwise': 0,
        'no-plusplus': 0,
        'max-len': 0,
        'max-classes-per-file': 0,
        indent: ['error', 4]
    }
};
