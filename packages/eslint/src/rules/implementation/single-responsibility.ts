import { FunctionDeclarationNode } from '../../types/ast/function-declaration-node';
import { Context } from '../../types/eslint/context';

type ComplexStatement = {
  name: string;
  count: number;
};

const DEFAULT_EXCLUDED_STATEMENTS = [{ name: 'IfStatement', count: 3 }];

export const onSingleResponsibilityCreate = (context: Context) => {
  const complexStatements = (context.options[0] as ComplexStatement[]) ?? DEFAULT_EXCLUDED_STATEMENTS;
  const detectedStatements: ComplexStatement[] = [];

  function checkComplexity(node: FunctionDeclarationNode) {
    node.body.body.forEach((n) => {
      if (complexStatements.filter((s) => s.name === n.type)) {
        const filtered = detectedStatements.filter((s) => s.name === n.type).pop();

        if (filtered) {
          filtered.count++;
        } else {
          detectedStatements.push({
            name: n.type,
            count: 1,
          });
        }
      }
    });

    if (
      detectedStatements.filter((ds) => {
        const rule = complexStatements.filter((cs) => cs.name === ds.name).pop();

        if (rule) return ds.count > rule.count;
        return false;
      }).length
    ) {
      context.report({
        node,
        messageId: 'singleResponsibilityMessage',
      });
    }
  }

  return {
    FunctionDeclaration: checkComplexity,
  };
};
