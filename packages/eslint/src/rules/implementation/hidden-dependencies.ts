import { FunctionDeclarationNode } from '../../types/ast/function-declaration-node';
import { Context } from '../../types/eslint/context';

export const onHiddenDepenciessCreate = (context: Context) => {
  return {
    FunctionDeclaration(node: FunctionDeclarationNode) {
      node.body.body.forEach((item) => {
        if (
          item.type === 'VariableDeclaration' &&
          item.declarations[item.declarations.length - 1].init.type === 'NewExpression'
        ) {
          context.report({
            node,
            messageId: 'hiddenDepsMessage',
          });
        }
      });
    },
  };
};
