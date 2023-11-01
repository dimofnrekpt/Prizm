import { Component, ChangeDetectionStrategy, Input, HostBinding, OnInit } from '@angular/core';
import {
  PrizmSwitcherItem,
  PrizmSwitcherSize,
  PrizmSwitcherType,
  prizmSwitcherHint,
} from './../../switcher.interface';
import { prizmDefaultProp } from '@prizm-ui/core';
import { PrizmAbstractTestId } from '../../../../abstract/interactive';
import { PrizmHintDirective } from '../../../../directives';

@Component({
  selector: 'prizm-switcher-item',
  templateUrl: './switcher-item.component.html',
  styleUrls: ['./switcher-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherItemComponent extends PrizmAbstractTestId implements OnInit {
  @Input() hint?: prizmSwitcherHint;

  @Input()
  @prizmDefaultProp()
  @HostBinding('attr.data-size')
  public size: PrizmSwitcherSize = 'l';

  @Input()
  @prizmDefaultProp()
  @HostBinding('attr.switcher-type')
  public type: PrizmSwitcherType = 'inner';

  @Input()
  public data: PrizmSwitcherItem | null = null;

  @Input()
  @prizmDefaultProp()
  public isActive = false;

  @Input()
  @prizmDefaultProp()
  public disabled = false;

  @Input()
  @HostBinding('class.full-width')
  @prizmDefaultProp()
  public fullWidth = false;

  override readonly testId_ = 'ui_switcher_item';

  get isDisabled(): boolean {
    return Boolean(this.disabled || this.data?.disabled);
  }

  readonly prizmHint_ = new PrizmHintDirective();

  @HostBinding('attr.prizmHint') get prizmHint(): any {
    return this.hint?.value || '';
  }

  ngOnInit(): void {
    this.prizmHint_.ngOnInit();
  }
}
