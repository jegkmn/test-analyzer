import { onPlainConstructorCreate } from '../implementation/plain-constructor';

export const plainConstructorMessage =
  'Class constructor must have plain logic inside. Refactor to increase testability.';

export const plainConstructor = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce plain class constructors through your code.',
      recommended: true,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              excludedStatements: {
                type: 'array',
                minimum: 0,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      plainConstructorMessage,
    },
  },
  create: onPlainConstructorCreate,
};
