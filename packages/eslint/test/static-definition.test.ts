import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { staticDefinition, staticDefinitionMessage } from '../src/rules/definition/static-definition';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
    export function test() {
        const variable1 = new MyClass();
    }
  `,
];

const invalidStatements = [
  `
   class MyClass {
     static hello() {
        return "Hello!!";
     }
   }
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('single-responsibility rule tests', staticDefinition, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [staticDefinitionMessage],
      output: invalidStatements[0],
    },
  ],
});
