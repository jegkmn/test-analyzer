import { Context } from '../../types/eslint/context';

export const DEFAULT_LIMIT = 3;
const CONDITIONAL_STATEMENTS = [
  'IfStatement',
  'SwitchStatement',
  'TryStatement',
  'DoWhileStatement',
  'WhileStatement',
  'WithStatement',
  'ForStatement',
  'ForInStatement',
  'ForOfStatement',
];
const CONDITIONAL_STATEMENT_CHILDREN = ['SwitchCase', 'BlockStatement'];

export interface NestedStatementsReturn {
  [key: string]: any;
}

export const onNestedStatementsCreate = (context: Context): NestedStatementsReturn => {
  const result: NestedStatementsReturn = {};
  const maxDepth = context.options[context.options.length - 1]?.limit ?? DEFAULT_LIMIT;

  function checkLevel(node: any) {
    let level = 0;

    function checkIfParentIsDefined(parent: any) {
      if (
        parent.parent?.type !== 'Program' &&
        CONDITIONAL_STATEMENTS.concat(CONDITIONAL_STATEMENT_CHILDREN).includes(parent.type) &&
        ++level > maxDepth
      ) {
        context.report({
          node,
          messageId: 'nestedStatementsMessage',
          data: {
            maxDepth,
          },
        });
      } else {
        if (parent.parent) {
          checkIfParentIsDefined(parent.parent);
        }
      }
    }

    if (node.parent) {
      checkIfParentIsDefined(node.parent);
    }
  }

  CONDITIONAL_STATEMENTS.forEach((s) => (result[s] = checkLevel));

  return result;
};
