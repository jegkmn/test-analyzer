import { IdentifierNode } from '../../types/ast/identifier-node';
import { VariableDeclaratorNode } from '../../types/ast/variable-declarator-node';
import { Context } from '../../types/eslint/context';

const DEFAULT_PROPERTY_ACCESS_LIMIT = 3;

type Variable = {
  name: string;
  type: string;
  accessCounter: number;
  node: any;
  isReported: boolean;
};

export const onTypeIndependentCreate = (context: Context) => {
  const propertyAccessLimit =
    context.options[context.options.length - 1]?.propertyAccessLimit ?? DEFAULT_PROPERTY_ACCESS_LIMIT;
  const declaredVariables: Variable[] = [];

  return {
    VariableDeclarator(node: VariableDeclaratorNode) {
      if (node.init.callee) {
        declaredVariables.push({
          name: node.id.name,
          type: node.init.callee.name,
          accessCounter: 0,
          node,
          isReported: false,
        });
      }
    },
    Identifier(node: IdentifierNode) {
      const variable = declaredVariables.filter((v) => v.name === node.name).pop();

      if (variable) {
        variable.accessCounter++;

        if (variable.accessCounter > propertyAccessLimit && !variable.isReported) {
          context.report({
            node: variable.node,
            messageId: 'typeIndependentMessage',
          });
          variable.isReported = true;
        }
      }
    },
  };
};
