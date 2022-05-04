import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { typeIndependent, typeIndependentMessage } from '../src/rules/definition/type-independent';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  export function gautiDataIrLaika(): string {
      const test = new MyClass();
      test.test1 = -4;
      
      return test;
  }
  `,
];

const invalidStatements = [
  `
  export function gautiDataIrLaika(): string {
      const test = new MyClass();
      test.test1 = -4;
  
      if (test.test1) {
          return 'Naktis';
      }
      if (test.test1) {
          return 'Naktis';
      }
      if (test.test1) {
          return 'Naktis';
      }
  
      return 'Test';
  }
  `,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('type-independent rule tests', typeIndependent, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [typeIndependentMessage],
      output: invalidStatements[0],
    },
  ],
});
