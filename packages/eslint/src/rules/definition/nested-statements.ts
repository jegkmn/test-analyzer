import { onNestedStatementsCreate } from '../implementation/nested-statements';

export const nestedStatementsMessage =
  'Logical blocks are too deep. Maximum allowed depth is {{maxDepth}}. Refactor to increase testability.';

export const nestedStatements = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce a maximum depth that logical blocks can be nested through your code.',
      recommended: true,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'integer',
            minimum: 0,
          },
          {
            type: 'object',
            properties: {
              limit: {
                type: 'integer',
                minimum: 0,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      nestedStatementsMessage,
    },
  },
  create: onNestedStatementsCreate,
};
