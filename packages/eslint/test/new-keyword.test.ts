import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { newKeyword, newKeywordMessage } from '../src/rules/definition/new-keyword';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  const test = 1;
`,
];

const invalidStatements = [
  `
  new Test();
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('new-keyword rule tests', newKeyword, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [newKeywordMessage],
      output: invalidStatements[0],
    },
  ],
});
