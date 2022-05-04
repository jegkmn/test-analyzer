import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { plainConstructor, plainConstructorMessage } from '../src/rules/definition/plain-constructor';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
    class MyClass {
        constructor() {
            const test = 'tests';
        }
    }
  `,
];

const invalidStatements = [
  `
    class MyClass {
        constructor() {
            if (true) {
                const test1 = new Test();
            } else {
                const test2 = new Test2();
            }
        }
    }
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('plain-constructor rule tests', plainConstructor, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [plainConstructorMessage],
      output: invalidStatements[0],
    },
  ],
});
