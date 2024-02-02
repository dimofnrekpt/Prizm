import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PolymorphContent } from '../../../directives/polymorph';
import { PrizmToastRef } from '../toast-ref';
import { PrizmAbstractTestId } from '../../../abstract/interactive';

@Component({
  selector: 'prizm-toast-single',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent extends PrizmAbstractTestId {
  override readonly testId_ = 'ui_toast_single';

  // TODO remove record to context type
  get context(): Record<string, any> {
    return this.toastRef as Record<string, any>;
  }
  get temp(): PolymorphContent {
    return this.toastRef.content;
  }
  constructor(public readonly toastRef: PrizmToastRef) {
    super();
  }
}
