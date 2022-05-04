import { IdentifierNode } from './identifier-node';
import { Loc } from './loc';
import { TsTypeAnnotationNode } from './ts-type-annotation-node';

export type PropertyDefinitionNode = {
  type: string;
  key: IdentifierNode;
  value: any;
  computed: boolean;
  static: boolean;
  declare: boolean;
  override: boolean;
  range: number[];
  loc: Loc;
  typeAnnotation: TsTypeAnnotationNode;
  accessibility: string;
};
