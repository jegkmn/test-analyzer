import { Loc } from './loc';

export type IdentifierNode = {
  type: string;
  name: string;
  range: number[];
  loc: Loc;
};
