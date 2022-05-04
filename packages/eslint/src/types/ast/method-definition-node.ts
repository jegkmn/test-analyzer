import { FunctionExpressionNode } from './function-expression-node';
import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';

export type MethodDefinitionNode = {
  type: string;
  key: IdentifierNode;
  value: FunctionExpressionNode;
  computed: boolean;
  static: boolean;
  kind: string;
  override: boolean;
  range: number[];
  loc: Loc;
};
