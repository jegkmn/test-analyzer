import { ExpressionStatementNode } from '../../types/ast/expression-statement-node';
import { Context } from '../../types/eslint/context';

export const onNewKeywordCreate = (context: Context) => {
  return {
    ExpressionStatement(node: ExpressionStatementNode) {
      if (node.expression.type === 'NewExpression') {
        context.report({
          node,
          messageId: 'newKeywordMessage',
        });
      }
    },
  };
};
