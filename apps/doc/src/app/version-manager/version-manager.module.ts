import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiStringifyContentPipeModule, TuiStringifyPipeModule } from '@taiga-ui/kit';

import { VersionManagerComponent } from './version-manager.component';
import { PrizmButtonModule } from '@prizm-ui/components';
import { PrizmLetModule } from '@prizm-ui/helpers';
import { PrizmVersionLinkPipe } from './pipes/versionLink.pipe';

@NgModule({
  imports: [
    CommonModule,
    PrizmLetModule,
    PrizmButtonModule,
    FormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    TuiStringifyPipeModule,
    TuiStringifyContentPipeModule,
    PrizmVersionLinkPipe,
  ],
  declarations: [VersionManagerComponent],
  exports: [VersionManagerComponent],
})
export class VersionManagerModule {}
