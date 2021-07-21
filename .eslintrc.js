module.exports = {
    'env': {
        'browser': true,
        'es2017': true,
        'node': true,
    },
    'parser': '@babel/eslint-parser',
    'extends': [
        'eslint:recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
        'requireConfigFile': false,
    },
    'plugins': [
        '@babel'
    ],
    'rules': {
        'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
        'no-trailing-spaces': [2, { 'skipBlankLines': false }],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'semi': 'error',
        'react/prop-types': 0,
        'array-bracket-spacing': ['error', 'never'],
        'no-multi-spaces': 'error',
        'prefer-const': 0,
        'prefer-destructuring': ['error', {
            'array': true,
            'object': true
        }, {
            'enforceForRenamedProperties': false
        }],
    }
};
