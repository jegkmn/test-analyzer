import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { singleResponsibility, singleResponsibilityMessage } from '../src/rules/definition/single-responsibility';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
    class MyClass {
        constructor() {
            const test = new Test();
        }
    }
  `,
];

const invalidStatements = [
  `
    export function gautiDataIrLaika(): string {
        const test = new MyClass();
        test.test = -4;
    
        if (test.test) {
            return 'Naktis';
        }
        if (test.test) {
            return 'Rytas';
        }
        if (test.test) {
            return 'Diena';
        }
        if (test.test) {
            return 'Diena';
        }
    }
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('single-responsibility rule tests', singleResponsibility, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [singleResponsibilityMessage],
      output: invalidStatements[0],
    },
  ],
});
