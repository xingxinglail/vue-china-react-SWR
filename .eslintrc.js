// module.exports = {
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         parser: 'babel-eslint',
//         'ecmaVersion': 2018,
//         'sourceType': 'module',
//         ecmaFeatures: {
//             jsx: true, // enable JSX
//             impliedStrict: true // enable global strict mode
//         }
//     },
//     extends: [
//         'airbnb',  // Uses airbnb, it including the react rule(eslint-plugin-react/eslint-plugin-jsx-a11y)
//         'plugin:promise/recommended'
//         // 'prettier', // Use prettier, it can disable all rules which conflict with prettier
//         // 'prettier/react' // Use prettier/react to pretty react syntax
//     ],
//     // settings: {
//     //     'import/resolver': { // This config is used by eslint-import-resolver-webpack
//     //         webpack: {
//     //             config: './webpack/webpack-common-config.js'
//     //         }
//     //     },
//     // },
//     env: {
//         browser: true // enable all browser global variables
//     },
//     'plugins': ['react-hooks', 'promise'], // ['prettier', 'react-hooks']
//     rules: {
//         // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
//         // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
//         'react-hooks/rules-of-hooks': 'error',
//         'react/jsx-one-expression-per-line': 0,
//         'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
//         'react/jsx-indent': ['error', 4, {
//             checkAttributes: false,
//             indentLogicalExpressions: true
//         }],
//         'react/jsx-indent-props': ['error', 4],
//         'react/jsx-curly-spacing': [2, {
//             'when': 'always',
//             'spacing': {
//                 'objectLiterals': 'never'
//             }
//         }],
//         'jsx-a11y/no-static-element-interactions': 'off',
//         'jsx-a11y/click-events-have-key-events': 'off',
//         'indent': [
//             2,
//             4,
//             {
//                 'SwitchCase': 1
//             }
//         ],
//         'semi': [
//             2,
//             'always'
//         ],
//         'import/extensions': 'off',
//         'import/no-unresolved': 'off',
//         'comma-spacing': [
//             2,
//             {
//                 'before': false,
//                 'after': true
//             }
//         ],
//         'comma-dangle': [
//             2,
//             'never'
//         ],
//         'no-console': 'off',
//         'space-before-function-paren': [
//             'error',
//             {
//                 'anonymous': 'always',
//                 'named': 'always',
//                 'asyncArrow': 'always'
//             }
//         ],
//         'import/prefer-default-export': 'off',
//         'template-curly-spacing': ['error', 'always'],
//         'arrow-parens': 'off',
//         'object-curly-newline': 'off',
//         'typescript-eslint/no-unused-vars': 'off',
//         'max-len': 'off',
//         'camelcase': 'off'
//     }
// };
module.exports = {
    // Specifies the ESLint parser
    parser: '@typescript-eslint/parser',
    extends: [
        // Uses the recommended rules from @eslint-plugin-react
        'plugin:react/recommended',
        // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: 'module',
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true
        }
    },
    rules: {
        // 'prettier/prettier': 'error',
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        // 'prefer-const': 'error',
        // 'no-var': 'error',
        // 'no-multiple-empty-lines': 'error',
        // '@typescript-eslint/no-explicit-any': 'off',
        // '@typescript-eslint/no-var-requires': 'off',
        // '@typescript-eslint/no-unused-vars': 'off',
        // '@typescript-eslint/explicit-member-accessibility': 'off',
        // '@typescript-eslint/interface-name-prefix': 'off',
        // '@typescript-eslint/no-empty-interface': 'off'
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: 'detect'
        }
    },
    env: {
        browser: true
    }
}
