import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuExampleComponent } from './side-menu-example.component';
import { prizmDocGenerateRoutes, PrizmAddonDocModule } from '@prizm-ui/doc';
import { RouterModule } from '@angular/router';
import { SideMenuExampleBasicComponent } from './examples/side-menu-example-basic/side-menu-example-basic.component';
import {
  PrizmButtonComponent,
  PrizmIconModule,
  PrizmInputTextModule,
  PrizmListingItemComponent,
  PrizmPanelModule,
} from '@prizm-ui/components';

@NgModule({
  declarations: [SideMenuExampleComponent, SideMenuExampleBasicComponent],
  imports: [
    CommonModule,
    PrizmAddonDocModule,
    PrizmIconModule,
    RouterModule.forChild(prizmDocGenerateRoutes(SideMenuExampleComponent)),
    PrizmPanelModule,
    PrizmInputTextModule,
    PrizmButtonComponent,
    PrizmListingItemComponent,
  ],
})
export class SideMenuExampleModule {}
