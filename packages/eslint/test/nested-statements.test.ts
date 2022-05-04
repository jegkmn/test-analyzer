import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { nestedStatements, nestedStatementsMessage } from '../src/rules/definition/nested-statements';
import { DEFAULT_LIMIT } from '../src/rules/implementation/nested-statements';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

const validStatements = [
  `
  const test = 1;
  switch (1) {
    case 1:
        switch (test) {
            case 1:
                console.log('test');
                break;
            default:
                break;
        }
        break;
    default:
        break;
  }
`,
];

const invalidStatements = [
  `
  const test = 1;
  switch (1) {
    case 1:
        switch (test) {
            case 1:
                switch (test) {
                    case 1:
                        switch (test) {
                            case 1:
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        break;
    default:
        break;
  }
`,
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('nested-statements rule tests', nestedStatements, {
  valid: validStatements,
  invalid: [
    {
      code: invalidStatements[0],
      errors: [nestedStatementsMessage.replace('{{maxDepth}}', `${DEFAULT_LIMIT}`)],
      output: invalidStatements[0],
    },
  ],
});
