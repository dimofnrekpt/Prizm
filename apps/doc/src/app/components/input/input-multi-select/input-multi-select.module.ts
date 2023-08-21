import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizmAddonDocModule, prizmDocGenerateRoutes } from '@prizm-ui/doc';
import { RouterModule } from '@angular/router';
import { InputInputMultiSelectComponent } from './input-multi-select.component';
import {
  PolymorphModule,
  PrizmButtonModule,
  PrizmCheckboxModule,
  PrizmIconModule,
  PrizmInputMultiSelectModule,
  PrizmMapperPipeModule,
  PrizmTreeModule,
} from '@prizm-ui/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizmInputMultiSelectWithTemplateExampleComponent } from './examples/with-template/multi-select-with-template-example.component';
import { PrizmInputMultiSelectBaseExampleComponent } from './examples/base/multi-select-base-example.component';
import { PrizmInputMultiSelectWithSearchExampleComponent } from './examples/with-search/multi-select-with-search-example.component';
import { PrizmInputMultiSelectWithObjectExampleComponent } from './examples/with-object/multi-select-with-object-example.component';
import { PrizmInputMultiSelectValidatorsExampleComponent } from './examples/validators/multi-select-validators-example.component';
import { PrizmInputMultiSelectWithTreeExampleComponent } from './examples/with-tree/multi-select-with-tree-example.component';

@NgModule({
  imports: [
    CommonModule,
    PrizmAddonDocModule,
    FormsModule,
    ReactiveFormsModule,
    PolymorphModule,
    PrizmButtonModule,
    PrizmTreeModule,
    PrizmCheckboxModule,
    PrizmMapperPipeModule,
    PrizmInputMultiSelectModule,
    PrizmIconModule,
    RouterModule.forChild(prizmDocGenerateRoutes(InputInputMultiSelectComponent)),
  ],
  declarations: [
    PrizmInputMultiSelectWithTreeExampleComponent,
    PrizmInputMultiSelectValidatorsExampleComponent,
    PrizmInputMultiSelectBaseExampleComponent,
    PrizmInputMultiSelectWithSearchExampleComponent,
    PrizmInputMultiSelectWithTemplateExampleComponent,
    PrizmInputMultiSelectWithObjectExampleComponent,
    InputInputMultiSelectComponent,
  ],
  exports: [InputInputMultiSelectComponent],
})
export class InputMultiSelectModule {}
