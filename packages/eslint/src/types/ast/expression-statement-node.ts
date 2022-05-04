import { Loc } from './loc';

export type ExpressionStatementNode = {
  type: string;
  expression: any;
  range: number[];
  loc: Loc;
};
