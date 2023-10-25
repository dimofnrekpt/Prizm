import { Component, ElementRef, HostBinding, Input, TemplateRef } from '@angular/core';
import { PrizmSplitterOrientation } from '../types';
import { PrizmAbstractTestId } from '@prizm-ui/core';

@Component({
  selector: 'prizm-splitter-gutter',
  templateUrl: `./gutter.component.html`,
  styleUrls: ['./gutter.component.less'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class]': 'orientation',
  },
})
export class PrizmSplitterGutterComponent extends PrizmAbstractTestId {
  @Input() areaBefore!: number;
  @Input() areaAfter!: number;

  @Input() orientation!: PrizmSplitterOrientation;
  @Input() @HostBinding('style.order') order!: number;
  @Input() template!: TemplateRef<unknown>;

  position!: number;
  override readonly testId_ = 'ui_splitter--gutter';
  constructor(public elementRef: ElementRef<HTMLElement>) {
    super();
  }
}
