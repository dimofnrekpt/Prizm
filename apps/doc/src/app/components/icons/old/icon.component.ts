import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IconDefs, PrizmToastService } from '@prizm-ui/components';
import { RawLoaderContent, TuiDocExample } from '@prizm-ui/doc';
import { Clipboard } from '@angular/cdk/clipboard';
import { PrizmIconsSvgRegistry } from '@prizm-ui/icons';
import { copyToClipboard } from '../../../util';

@Component({
  selector: 'prizm-icon-example',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly iconVariants = IconDefs.reduce((a: any[], c) => a.concat(c.data), []);
  readonly iconVariantsWithPostfixNumber = this.iconVariants.filter(i => i.match(/-[0-9]+$/g));
  readonly iconVariantsDoubled = this.iconVariants.filter(i =>
    this.iconVariantsWithPostfixNumber.find(iwc => i === iwc || i === iwc.replace(/-[0-9]+$/g, ''))
  );

  public icon = this.iconVariants[0];

  readonly iconSizes = [24, 16];
  public iconSize = 24;

  public defs = IconDefs;

  readonly setupModule: RawLoaderContent = import('./examples/setup-module.md?raw');

  readonly exampleBase: TuiDocExample = {
    TypeScript: import('./examples/base/icon-base-example.component.ts?raw'),
    HTML: import('./examples/base/icon-base-example.component.html?raw'),
  };

  constructor(
    @Inject(Clipboard) public readonly clipboard: Clipboard,
    private readonly toastService: PrizmToastService,
    private readonly iconRegistry: PrizmIconsSvgRegistry
  ) {}

  public copy(value: string): void {
    copyToClipboard(value, this.clipboard, this.toastService);
  }
}
