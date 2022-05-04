import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';

export type VariableDeclaratorNode = {
  type: string;
  id: IdentifierNode;
  init: any;
  range: number[];
  loc: Loc;
};
