import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { tooManyArgumentsMessage, tooManyParameters } from '../src/rules/definition/too-many-parameters';
import { DEFAULT_LIMIT } from '../src/rules/implementation/too-many-parameters';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  class MyClass {
      constructor(private test: string, private test1: string) {
          console.log('created')
      }
  }
  `,
];

const invalidStatements = [
  `
  class MyClass {
      constructor(private test: string, private test1: string, private test2: string, private test3: string, private test4: string) {
          console.log('created')
      }
  }
  `,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('too-many-parameters rule tests', tooManyParameters, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [tooManyArgumentsMessage.replace('{{limit}}', `${DEFAULT_LIMIT}`)],
      output: invalidStatements[0],
    },
  ],
});
