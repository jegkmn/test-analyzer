import { FunctionExpressionNode } from '../../types/ast/function-expression-node';
import { Context } from '../../types/eslint/context';

export const DEFAULT_LIMIT = 3;

export const onTooManyParametersCreate = (context: Context) => {
  const limit = context.options[context.options - 1]?.limit ?? DEFAULT_LIMIT;

  return {
    FunctionExpression(node: FunctionExpressionNode) {
      if (node.params.length > limit)
        context.report({
          node,
          messageId: 'tooManyArgumentsMessage',
          data: {
            limit,
          },
        });
    },
  };
};
