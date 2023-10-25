import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  HostBinding,
  Inject,
  Input,
  Optional,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { PrizmTreeChildrenDirective } from '../../directives/tree-children.directive';
import { PRIZM_TREE_NODE } from '../../misc/tree.tokens';
import { PrizmTreeItemComponent } from '../tree-item/tree-item.component';
import { PrizmHandler } from '../../../../types';
import { PolymorphContent } from '../../../../directives';
import { PrizmAbstractTestId } from '../../../../abstract/interactive';

@Component({
  selector: 'prizm-tree[value]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: PRIZM_TREE_NODE,
      useExisting: PrizmTreeComponent,
    },
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    role: 'tree',
  },
  exportAs: 'prizmTree',
})
export class PrizmTreeComponent<T> extends PrizmAbstractTestId implements DoCheck {
  private readonly check$ = new Subject<void>();

  @Input()
  value!: T;

  @ViewChild(PrizmTreeItemComponent)
  readonly item?: PrizmTreeItemComponent;

  @ViewChild(PrizmTreeComponent)
  readonly child?: PrizmTreeComponent<T>;

  readonly children$ = this.check$.pipe(
    startWith(null),
    map(() => this.handler(this.value)),
    distinctUntilChanged()
  );

  override readonly testId_ = 'ui_tree';

  @Input()
  usePaddingIndent!: boolean;

  @Input()
  content: PolymorphContent = ({ $implicit }: unknown) => String($implicit);

  constructor(
    @Optional()
    @Inject(PrizmTreeChildrenDirective)
    readonly directive: PrizmTreeChildrenDirective<T> | null
  ) {
    super();
  }

  ngDoCheck(): void {
    this.check$.next();
    this.item?.ngDoCheck();
    this.child?.ngDoCheck();
  }

  private get handler(): PrizmHandler<T, readonly T[]> {
    return this.directive?.childrenHandler ?? PrizmTreeChildrenDirective.defaultHandler;
  }
}
