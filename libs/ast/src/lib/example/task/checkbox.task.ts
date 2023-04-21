import {
  PrizmAstAddImportsIfNeededCodeTask,
  PrizmAstAddImportsToNgModuleCodeTask,
  prizmAstCreateActionBy,
  PrizmChangeNameTemplateTask,
  PrizmMoveToContentTemplateTask,
  PrizmNotSupportedTemplateTask,
  PrizmRenameTemplateTask,
  PrizmTemplateTask,
} from '../../task';
import { PrizmCodeTask } from '../../task/ts/model';
import { prizmAstCreateCodeTaskBy } from '../../task/ts/util';

export const ZyfraCheckboxTemplateTasks: PrizmTemplateTask[] = [
  {
    selector: 'zyfra-checkbox',
    tasks: [
      prizmAstCreateActionBy(PrizmChangeNameTemplateTask, {
        name: 'prizm-checkbox',
      }),
    ],
    inputs: {
      binary: [
        prizmAstCreateActionBy(PrizmRenameTemplateTask, {
          newAttrName: 'checked',
        }),
      ],
      label: [prizmAstCreateActionBy(PrizmMoveToContentTemplateTask, {})],

      disabledControl: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      name: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      value: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      inputId: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      ariaLabelledBy: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      ariaLabel: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      style: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      styleClass: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      labelStyleClass: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      checkboxIcon: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      readonly: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      required: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      trueValue: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
      falseValue: [prizmAstCreateActionBy(PrizmNotSupportedTemplateTask, {})],
    },
    outputs: {},
  },
];

export const ZyfraCheckboxCodeTasks: PrizmCodeTask[] = [
  prizmAstCreateCodeTaskBy(PrizmAstAddImportsIfNeededCodeTask, {
    importToAdd: '@prizm-ui/components',
    namedImports: ['PrizmCheckboxModule'],
    targetImport: '@digital-plant/zyfra-components',
    targetNamedImports: ['ZyfraCheckBoxModule'],
    commentBeforeImport: 'PRIZM:MIGRATOR added new module for migrate from ZyfraCheckBoxModule',
  }),
  prizmAstCreateCodeTaskBy(PrizmAstAddImportsToNgModuleCodeTask, {
    newModule: 'PrizmCheckboxModule',
    moduleToFind: 'ZyfraCheckBoxModule',
    comment: 'PRIZM:MIGRATOR: Our added module for migrate from ZyfraCheckBoxModule',
  }),
];
