import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';

export type FunctionDeclarationNode = {
  type: string;
  id: IdentifierNode;
  generator: boolean;
  expression: boolean;
  async: boolean;
  params: [];
  body: any;
  range: number[];
  loc: Loc;
};
