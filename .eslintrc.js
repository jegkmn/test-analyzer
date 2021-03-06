module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ["test-analyzer"],
    parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "test-analyzer/too-many-parameters": [1, {limit: 3}],
        "test-analyzer/hidden-dependencies": [1],
        "test-analyzer/nested-statements": [1, {limit: 3}],
        "test-analyzer/singleton": [1, {excludedClasses: ['Test']}],
        "test-analyzer/single-responsibility": [1,
            [
                {name: 'IfStatement', count: 3},
                {name: 'ReturnStatement', count: 3},
                {name: 'ExpressionStatement', count: 3},
                {name: 'SwitchStatement', count: 3},
                {name: 'TryStatement', count: 3},
                {name: 'DoWhileStatement', count: 3},
                {name: 'WhileStatement', count: 3},
                {name: 'ForStatement', count: 3},
                {name: 'ForInStatement', count: 3},
                {name: 'ForOfStatement', count: 3}
            ],
        ],
        "test-analyzer/static-definition": [1],
        "test-analyzer/new-keyword": [1],
        "test-analyzer/too-many-dependencies": [1, {limit: 3}],
        "test-analyzer/plain-constructor": [1, {excludedStatements: ['VariableDeclaration']}],
        "test-analyzer/type-independent": [1, {propertyAccessLimit: 3}],
    },
};
