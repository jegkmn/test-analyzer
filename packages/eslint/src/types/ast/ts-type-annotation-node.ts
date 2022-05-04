import { Loc } from './loc';

export type TsTypeAnnotationNode = {
  type: string;
  loc: Loc;
  range: number[];
  typeAnnotation: any;
};
