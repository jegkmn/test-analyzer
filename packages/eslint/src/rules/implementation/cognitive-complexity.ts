import { Context } from '../../types/eslint/context';

export const DEFAULT_LIMIT = 25;

type ComplexNode = {
  node: any;
  complexity: number;
};

export const onCognitiveComplexityCreate = (context: Context) => {
  {
    const nestingNodes: Set<any> = new Set();
    const consideredLogicalExpressions: Set<any> = new Set();
    const enclosingFunctions: any = [];
    const limit = context.options[0]?.limit ?? DEFAULT_LIMIT;
    const possibleComplexNodes: ComplexNode[] = [];

    let complexityNested: ComplexNode[] = [];
    let topLevelOwnComplexity: ComplexNode[] = [];
    let nestingLevel = 0;
    let rootNode: any;
    let complexity = 0;

    let secondLevelFunctions: Array<{
      node: any;
      parent: any | undefined;
      complexity: ComplexNode[];
    }> = [];

    const onFunction = (node: any) => {
      if (enclosingFunctions.length === 0) {
        topLevelOwnComplexity = [];
        secondLevelFunctions = [];
      } else if (enclosingFunctions.length === 1) {
        complexityNested = [];
      } else {
        nestingLevel++;
        nestingNodes.add(node);
      }
      enclosingFunctions.push(node);
    };

    const onFunctionExit = (node: any) => {
      enclosingFunctions.pop();
      if (enclosingFunctions.length === 0) {
        let totalComplexity = topLevelOwnComplexity;
        secondLevelFunctions.forEach((secondLevelFunction) => {
          totalComplexity = totalComplexity.concat(secondLevelFunction.complexity);
        });
        checkFunction(totalComplexity);
      } else if (enclosingFunctions.length === 1) {
        secondLevelFunctions.push({
          node,
          parent: node.parent,
          complexity: complexityNested,
        });
      }
    };

    const checkIfStatement = (ifStatement: any) => {
      const { parent } = ifStatement;
      const { loc } = getFirstToken(ifStatement, context);

      if (isIfStatement(parent) && parent.alternate === ifStatement) {
        increaseComplexity(loc);
      } else {
        increaseStructuralComplexity(loc);
      }

      nestingNodes.add(ifStatement.consequent);

      if (ifStatement.alternate && !isIfStatement(ifStatement.alternate)) {
        nestingNodes.add(ifStatement.alternate);
        const elseTokenLoc = getFirstTokenAfter(ifStatement.consequent, context)?.loc;
        increaseComplexity(elseTokenLoc);
      }
    };

    const checkLoop = (loop: any) => {
      increaseStructuralComplexity(getFirstToken(loop, context).loc);
      nestingNodes.add(loop.body);
    };

    const checkSwitchStatement = (switchStatement: any) => {
      increaseStructuralComplexity(getFirstToken(switchStatement, context).loc);
      for (const switchCase of switchStatement.cases) {
        nestingNodes.add(switchCase);
      }
    };

    const checkContinueOrBreakStatement = (statement: any) => {
      if (statement.label) {
        increaseComplexity(getFirstToken(statement, context).loc);
      }
    };

    const checkCatchClause = (catchClause: any) => {
      increaseStructuralComplexity(getFirstToken(catchClause, context).loc);
      nestingNodes.add(catchClause.body);
    };

    const checkConditionalExpression = (conditionalExpression: any) => {
      const questionTokenLoc = getFirstTokenAfter(conditionalExpression.test, context)?.loc;
      increaseStructuralComplexity(questionTokenLoc);
      nestingNodes.add(conditionalExpression.consequent);
      nestingNodes.add(conditionalExpression.alternate);
    };

    const checkLogicalExpression = (logicalExpression: any) => {
      if (!consideredLogicalExpressions.has(logicalExpression)) {
        const flattenedLogicalExpressions = flattenLogicalExpression(logicalExpression);

        let previous: any;
        for (const current of flattenedLogicalExpressions) {
          if (!previous || previous.operator !== current.operator) {
            const operatorTokenLoc = getFirstTokenAfter(logicalExpression.left, context)?.loc;
            increaseComplexity(operatorTokenLoc);
          }
          previous = current;
        }
      }
    };

    const flattenLogicalExpression = (node: any) => {
      if (node !== undefined && node.type === 'LogicalExpression') {
        consideredLogicalExpressions.add(node);
        return [...flattenLogicalExpression(node.left), node, ...flattenLogicalExpression(node.right)];
      }
      return [];
    };

    const increaseStructuralComplexity = (node: any) => {
      const additionalComplexity = nestingLevel + 1;
      const complexityPoint = { complexity: additionalComplexity, node };
      if (enclosingFunctions.length === 0) {
        complexity += additionalComplexity;
      } else if (enclosingFunctions.length === 1) {
        topLevelOwnComplexity.push(complexityPoint);
      } else {
        complexityNested.push({ complexity: additionalComplexity + 1, node });
      }
    };

    const increaseComplexity = (node: any) => {
      const complexNode: ComplexNode = { complexity: 1, node };
      if (enclosingFunctions.length === 0) {
        complexity += 1;
      } else if (enclosingFunctions.length === 1) {
        topLevelOwnComplexity.push(complexNode);
      } else {
        complexityNested.push(complexNode);
      }
    };

    const checkFunction = (complexNodes: ComplexNode[] = []) => {
      complexity += complexNodes.reduce((prev, curr) => prev + curr.complexity, 0);

      if (complexity > limit) {
        possibleComplexNodes.push({
          complexity,
          node: rootNode,
        });
      }
    };

    const initReport = () => {
      let max: ComplexNode = possibleComplexNodes[0];

      if (max && possibleComplexNodes.length > 1) {
        for (const node of possibleComplexNodes) {
          if (node.complexity > max.complexity) {
            max = node;
          }
        }
      }

      if (max) {
        context.report({
          node: max.node,
          messageId: 'cognitiveComplexityMessage',
          data: { complexity: max.complexity, limit },
        });
      }
    };

    return {
      ':function': (node: any) => {
        onFunction(node);
      },
      ':function:exit'(node: any) {
        onFunctionExit(node);
      },
      '*'(node: any) {
        if (nestingNodes.has(node)) {
          nestingLevel++;
        }
      },
      '*:exit'(node: any) {
        if (node.type === 'Program') {
          initReport();
        }
        if (nestingNodes.has(node)) {
          nestingLevel--;
          nestingNodes.delete(node);
        }
      },
      Program(node: any) {
        rootNode = node;
        complexity = 0;
      },
      IfStatement(node: any) {
        checkIfStatement(node);
      },
      ForStatement(node: any) {
        checkLoop(node);
      },
      ForInStatement(node: any) {
        checkLoop(node);
      },
      ForOfStatement(node: any) {
        checkLoop(node);
      },
      DoWhileStatement(node: any) {
        checkLoop(node);
      },
      WhileStatement(node: any) {
        checkLoop(node);
      },
      SwitchStatement(node: any) {
        checkSwitchStatement(node);
      },
      ContinueStatement(node: any) {
        checkContinueOrBreakStatement(node);
      },
      BreakStatement(node: any) {
        checkContinueOrBreakStatement(node);
      },
      CatchClause(node: any) {
        checkCatchClause(node);
      },
      LogicalExpression(node: any) {
        checkLogicalExpression(node);
      },
      ConditionalExpression(node: any) {
        checkConditionalExpression(node);
      },
    };
  }
};

export function isIfStatement(node: any) {
  return node !== undefined && node.type === 'IfStatement';
}

export function getFirstTokenAfter(node: any, context: any): any {
  return context.getSourceCode().getTokenAfter(node);
}

export function getFirstToken(node: any, context: any): any {
  return context.getSourceCode().getTokens(node)[0];
}
