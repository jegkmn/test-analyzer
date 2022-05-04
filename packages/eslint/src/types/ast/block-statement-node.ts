import { Loc } from './loc';

export type BlockStatementNode = {
  type: string;
  body: any;
  range: number[];
  loc: Loc;
};
