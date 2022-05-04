import { MethodDefinitionNode } from '../../types/ast/method-definition-node';
import { PropertyDefinitionNode } from '../../types/ast/property-definition-node';
import { Context } from '../../types/eslint/context';

export const onStaticDefinitionCreate = (context: Context) => {
  function checkIfStatic(node: MethodDefinitionNode | PropertyDefinitionNode) {
    if (node.static) {
      context.report({
        node,
        messageId: 'staticDefinitionMessage',
      });
    }
  }

  return {
    PropertyDefinition: checkIfStatic,
    MethodDefinition: checkIfStatic,
  };
};
