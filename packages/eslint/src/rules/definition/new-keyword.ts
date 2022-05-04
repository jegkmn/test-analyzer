import { onNewKeywordCreate } from '../implementation/new-keyword';

export const newKeywordMessage = 'New instance creation increases complexity. Refactor to increase testability.';

export const newKeyword = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce minimum new object instances through your code.',
      recommended: true,
    },
    messages: {
      newKeywordMessage,
    },
  },
  create: onNewKeywordCreate,
};
