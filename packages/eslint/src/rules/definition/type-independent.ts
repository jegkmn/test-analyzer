import { onTypeIndependentCreate } from '../implementation/type-independent';

export const typeIndependentMessage = 'Too much logic is based on type. Refactor to increase testability.';

export const typeIndependent = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce method type independence through your code.',
      recommended: true,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              propertyAccessLimit: {
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
      typeIndependentMessage,
    },
  },
  create: onTypeIndependentCreate,
};
