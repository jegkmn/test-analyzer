import { onSingletonCreate } from '../implementation/singleton';

export const singletonMessage = 'Current class is initialized more than once. Refactor to increase testability.';

export const singleton = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce singleton pattern for classes through your code.',
      recommended: true,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              excludedClasses: {
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
      singletonMessage,
    },
  },
  create: onSingletonCreate,
};
