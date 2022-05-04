import { onTooManyParametersCreate } from '../implementation/too-many-parameters';

export const tooManyArgumentsMessage =
  'Class or method has more than {{limit}} parameters. Refactor to increase testability.';

export const tooManyParameters = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce maximum parameter limit for class & methods through your code.',
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
      tooManyArgumentsMessage,
    },
  },
  create: onTooManyParametersCreate,
};
