import { ExpressionStatementNode } from '../../types/ast/expression-statement-node';
import { Context } from '../../types/eslint/context';

const DECLARED_CLASSES: string[] = [];

export const onSingletonCreate = (context: Context) => {
  const excludedClasses = context.options[0]?.excludedClasses;

  return {
    ExpressionStatement(node: ExpressionStatementNode) {
      if (node.expression.type === 'NewExpression') {
        const callee = node.expression.callee;

        if (!excludedClasses?.includes(callee.name) && DECLARED_CLASSES.includes(callee.name)) {
          context.report({
            node,
            messageId: 'singletonMessage',
          });
        } else {
          DECLARED_CLASSES.push(callee.name);
        }
      }
    },
  };
};
