import { onCognitiveComplexityCreate } from '../implementation/cognitive-complexity';

export const cognitiveComplexityMessage =
  'File cognitive complexity is above the limit {{complexity}} > {{limit}}. Refactor to increase testability.';

export const cognitiveComplexity = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce a maximum cognitive complexity limit through your code.',
      recommended: 'warn',
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
      cognitiveComplexityMessage,
    },
  },
  create: onCognitiveComplexityCreate,
};
