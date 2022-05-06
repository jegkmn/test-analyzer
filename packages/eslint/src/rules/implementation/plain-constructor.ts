import { MethodDefinitionNode } from '../../types/ast/method-definition-node';
import { Context } from '../../types/eslint/context';

const DEFAULT_EXCLUDED_STATEMENTS = ['IfStatement'];

export const onPlainConstructorCreate = (context: Context) => {
  const excludedStatements = context.options[0]?.excludedStatements ?? DEFAULT_EXCLUDED_STATEMENTS;

  return {
    MethodDefinition(node: MethodDefinitionNode) {
      if (node.kind === 'constructor') {
        node.value.body.body.forEach((n) => {
          if (excludedStatements.includes(n.type)) {
            context.report({
              node,
              messageId: 'plainConstructorMessage',
            });
          }
        });
      }
    },
  };
};
