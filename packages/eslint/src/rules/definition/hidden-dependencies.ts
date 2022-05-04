import { onHiddenDepenciessCreate } from '../implementation/hidden-dependencies';

export const hiddenDependenciesMessage = 'Possible hidden dependency. Refactor to increase testability.';

export const hiddenDependencies = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce minimal hidden dependency presence through your code.',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      hiddenDepsMessage: hiddenDependenciesMessage,
    },
  },
  create: onHiddenDepenciessCreate,
};
