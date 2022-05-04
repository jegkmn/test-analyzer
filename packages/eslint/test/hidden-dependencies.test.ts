import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { hiddenDependenciesMessage } from '../src/rules/definition/hidden-dependencies';
import { hiddenDependencies } from '../src/rules/definition/hidden-dependencies';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  export function test() {
     console.log('test');
  }
`,
];

const invalidStatements = [
  `
  export function test() {
     const variable1 = new MyClass();
  }
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('hidden-dependencies rule tests', hiddenDependencies, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [hiddenDependenciesMessage],
      output: invalidStatements[0],
    },
  ],
});
