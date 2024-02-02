import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomControlExampleComponent } from './zoom-control-example.component';
import { prizmDocGenerateRoutes, PrizmAddonDocModule } from '@prizm-ui/doc';
import { RouterModule } from '@angular/router';
import { ZoomControlExampleBasicComponent } from './examples/zoom-control-example-basic/zoom-control-example-basic.component';
import {
  PrizmButtonModule,
  PrizmDataListModule,
  PrizmDropdownControllerModule,
  PrizmDropdownHostModule,
  PrizmIconModule,
  PrizmInputSelectModule,
  PrizmInputTextModule,
  PrizmListingItemComponent,
  PrizmPanelModule,
} from '@prizm-ui/components';

@NgModule({
  declarations: [ZoomControlExampleComponent, ZoomControlExampleBasicComponent],
  imports: [
    CommonModule,
    PrizmAddonDocModule,
    PrizmIconModule,
    RouterModule.forChild(prizmDocGenerateRoutes(ZoomControlExampleComponent)),
    PrizmPanelModule,
    PrizmInputTextModule,
    PrizmInputSelectModule,
    PrizmDropdownHostModule,
    PrizmDataListModule,
    PrizmButtonModule,
    PrizmDropdownControllerModule,
    PrizmListingItemComponent,
  ],
})
export class ZoomControlExampleModule {}
