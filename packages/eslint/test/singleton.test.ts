import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { singleton, singletonMessage } from '../src/rules/definition/singleton';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
    new MyClass();
  `,
];

const invalidStatements = [
  `
    new MyClass();
    new MyClass();
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('singleton rule tests', singleton, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [singletonMessage, singletonMessage],
      output: invalidStatements[0],
    },
  ],
});
