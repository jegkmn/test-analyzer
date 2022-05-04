import { hiddenDependencies } from './rules/definition/hidden-dependencies';
import { nestedStatements } from './rules/definition/nested-statements';
import { newKeyword } from './rules/definition/new-keyword';
import { plainConstructor } from './rules/definition/plain-constructor';
import { singleResponsibility } from './rules/definition/single-responsibility';
import { singleton } from './rules/definition/singleton';
import { staticDefinition } from './rules/definition/static-definition';
import { tooManyDependencies } from './rules/definition/too-many-dependencies';
import { tooManyParameters } from './rules/definition/too-many-parameters';
import { typeIndependent } from './rules/definition/type-independent';

module.exports = {
  rules: {
    'hidden-dependencies': hiddenDependencies,
    'nested-statements': nestedStatements,
    'new-keyword': newKeyword,
    'plain-constructor': plainConstructor,
    'single-responsibility': singleResponsibility,
    singleton: singleton,
    'too-many-parameters': tooManyParameters,
    'too-many-dependencies': tooManyDependencies,
    'static-definition': staticDefinition,
    'type-independent': typeIndependent,
  },
};
