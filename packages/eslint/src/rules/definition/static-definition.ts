import { onStaticDefinitionCreate } from '../implementation/static-definition';

export const staticDefinitionMessage =
  'Static methods will increase overall complexity of the code. Refactor to increase testability.';

export const staticDefinition = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce static definition absence through your code.',
      recommended: true,
    },
    messages: {
      staticDefinitionMessage,
    },
  },
  create: onStaticDefinitionCreate,
};
