import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';

export type FunctionExpressionNode = {
  type: string;
  id?: IdentifierNode;
  params: [];
  generator: boolean;
  expression: boolean;
  async: boolean;
  body: any;
  range: number[];
  loc: Loc;
};
