import { ClassDeclarationNode } from '../../types/ast/class-declaration-node';
import { Context } from '../../types/eslint/context';

export const DEFAULT_LIMIT = 3;

export const onTooManyDependenciesCreate = (context: Context) => {
  const limit = context.options[0]?.limit ?? DEFAULT_LIMIT;

  return {
    ClassDeclaration(node: ClassDeclarationNode) {
      if (node.body.body.filter((n) => n.type === 'PropertyDefinition').length > limit)
        context.report({
          node,
          messageId: 'tooManyDependenciesMessage',
          data: {
            limit,
          },
        });
    },
  };
};
