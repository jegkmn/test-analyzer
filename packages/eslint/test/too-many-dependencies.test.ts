import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { tooManyDependencies, tooManyDependenciesMessage } from '../src/rules/definition/too-many-dependencies';
import { DEFAULT_LIMIT } from '../src/rules/implementation/too-many-dependencies';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  class MyClass {
      public test: number;
      public test1: number;
  }
  `,
];

const invalidStatements = [
  `
  class MyClass {
      public test1: number;
      public test2: number;
      public test3: number;
      public test4: number;
      public test5: number;
      public test6: number;
  }
  `,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('too-many-dependencies rule tests', tooManyDependencies, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [tooManyDependenciesMessage.replace('{{limit}}', `${DEFAULT_LIMIT}`)],
      output: invalidStatements[0],
    },
  ],
});
