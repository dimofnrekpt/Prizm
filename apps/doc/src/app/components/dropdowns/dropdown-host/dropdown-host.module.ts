import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizmAddonDocModule, prizmDocGenerateRoutes } from '@prizm-ui/doc';
import { RouterModule } from '@angular/router';
import {
  PolymorphModule,
  PrizmButtonModule,
  PrizmCheckboxModule,
  PrizmChipsModule,
  PrizmDataListModule,
  PrizmDropdownHostModule,
  PrizmIconModule,
  PrizmInputLayoutDateTimeModule,
  PrizmInputTextModule,
  PrizmRadioButtonModule,
} from '@prizm-ui/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownHostComponent } from './dropdown-host.component';
import { PrizmDropdownHostExampleWithTemplateComponent } from './examples/with-template/template';
import { PrizmSelectPanelExampleComponent } from './examples/select-panel-example/select-panel-example.component';
import { PrizmDropdownHostDateListEditExampleComponent } from './examples/date-list-edit/date-list-edit.component';
import { PrizmCallFuncModule, PrizmLetModule } from '@prizm-ui/helpers';
import { PrizmDropdownHostExampleWithCustomContextComponent } from './examples/with-custom-context/with-custom-context.component';
import { PrizmDropdownHostDateListExampleComponent } from './examples/date-list-with-nested/date-list.component';
import { PrizmDropdownHostCustomStyleComponent } from './examples/custom-style/custom-style-example.component';
import { PrizmDropdownHostExampleByMethodComponent } from './examples/by-method/by-method-example.component';

@NgModule({
  imports: [
    CommonModule,
    PrizmAddonDocModule,
    FormsModule,
    ReactiveFormsModule,
    PolymorphModule,
    PrizmDataListModule,
    PrizmButtonModule,
    PrizmDropdownHostModule,
    RouterModule.forChild(prizmDocGenerateRoutes(DropdownHostComponent)),
    PrizmCheckboxModule,
    PrizmInputLayoutDateTimeModule,
    PrizmInputTextModule,
    PrizmIconModule,
    PrizmRadioButtonModule,
    PrizmCallFuncModule,
    PrizmLetModule,
    PrizmButtonModule,
    FormsModule,
    PrizmChipsModule,
  ],
  declarations: [
    PrizmDropdownHostExampleByMethodComponent,
    PrizmDropdownHostCustomStyleComponent,
    PrizmDropdownHostExampleWithTemplateComponent,
    PrizmDropdownHostDateListEditExampleComponent,
    PrizmDropdownHostDateListExampleComponent,
    PrizmDropdownHostExampleWithCustomContextComponent,
    DropdownHostComponent,
    PrizmSelectPanelExampleComponent,
  ],
  exports: [DropdownHostComponent],
})
export class DropdownHostModule {}
