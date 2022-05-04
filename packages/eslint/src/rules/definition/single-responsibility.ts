import { onSingleResponsibilityCreate } from '../implementation/single-responsibility';

export const singleResponsibilityMessage =
  'Method does not follow single responsibility pattern. Refactor to increase testability.';

export const singleResponsibility = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce single responsibility pattern on the methods through your code.',
      recommended: true,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'array',
            properties: {
              complexMethods: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  count: {
                    type: 'number',
                  },
                },
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      singleResponsibilityMessage,
    },
  },
  create: onSingleResponsibilityCreate,
};
