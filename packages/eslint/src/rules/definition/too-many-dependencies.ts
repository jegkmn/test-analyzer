import { onTooManyDependenciesCreate } from '../implementation/too-many-dependencies';

export const tooManyDependenciesMessage =
  'Class or method has more than {{limit}} dependencies. Refactor to increase testability.';

export const tooManyDependencies = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce dependency limit for classes & methods through your code.',
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
      tooManyDependenciesMessage,
    },
  },
  create: onTooManyDependenciesCreate,
};
