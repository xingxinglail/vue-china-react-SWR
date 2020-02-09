module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: 'babel-eslint',
        'ecmaVersion': 2018,
        'sourceType': 'module',
        ecmaFeatures: {
            jsx: true, // enable JSX
            impliedStrict: true // enable global strict mode
        }
    },
    extends: [
        'airbnb',  // Uses airbnb, it including the react rule(eslint-plugin-react/eslint-plugin-jsx-a11y)
        'plugin:promise/recommended',
        // 'prettier', // Use prettier, it can disable all rules which conflict with prettier
        // 'prettier/react' // Use prettier/react to pretty react syntax
    ],
    // settings: {
    //     'import/resolver': { // This config is used by eslint-import-resolver-webpack
    //         webpack: {
    //             config: './webpack/webpack-common-config.js'
    //         }
    //     },
    // },
    env: {
        browser: true // enable all browser global variables
    },
    'plugins': ['react-hooks', 'promise'], // ['prettier', 'react-hooks']
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
        'react/jsx-indent': ['error', 4, { checkAttributes: true, indentLogicalExpressions: true }],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-curly-spacing': [2, {
            'when': 'always', 'spacing': {
                'objectLiterals': 'never'
            }
        }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'indent': [
            2,
            4,
            {
                'SwitchCase': 1
            }
        ],
        'semi': [
            2,
            'always'
        ],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        "comma-spacing": [
            2,
            {
                "before": false,
                "after": true
            }
        ],
        "comma-dangle": [
            2,
            "never"
        ],
        "no-console": "off",
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "always",
                "asyncArrow": "always"
            }
        ]
    },
};
