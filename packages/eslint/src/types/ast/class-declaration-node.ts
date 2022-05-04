import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';

export type ClassDeclarationNode = {
  type: string;
  id: IdentifierNode;
  body: any;
  superClass: any;
  range: number[];
  loc: Loc;
};
