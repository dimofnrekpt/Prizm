import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IBreadcrumb } from './breadcrumb.interface';
import { animationFrameScheduler, BehaviorSubject, merge, Subject } from 'rxjs';
import { PrizmDestroyService, prizmEmptyQueryList } from '@prizm-ui/helpers';
import { debounceTime, observeOn, takeUntil, tap } from 'rxjs/operators';
import { PrizmAbstractTestId } from '../../abstract/interactive';
import { PrizmBreadcrumbDirective } from './breadcrumbs.directive';
import { CommonModule } from '@angular/common';
import { PrizmIconModule } from '../icon';
import { PrizmDropdownHostModule } from '../dropdowns/dropdown-host';

@Component({
  selector: 'prizm-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PrizmDestroyService],
  standalone: true,
  imports: [
    CommonModule,
    // TODO !ng16 change all icon module to svg module
    PrizmIconModule,
    PrizmDropdownHostModule,
  ],
})
export class PrizmBreadcrumbsComponent<Breadcrumb extends IBreadcrumb>
  extends PrizmAbstractTestId
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() set breadcrumbs(data: Breadcrumb[]) {
    this.breadcrumbs$.next(data);
  }

  public get breadcrumbs(): Breadcrumb[] {
    return this.breadcrumbs$.getValue();
  }

  override readonly testId_ = 'ui_breadcrumbs';

  @Output() public breadcrumbChange: EventEmitter<Breadcrumb> = new EventEmitter();
  @ViewChild('container', { static: true }) public containerRef!: ElementRef;
  @ViewChild('breadcrumbsFake', { static: true }) public fakeBreadcrumbContainer!: ElementRef;
  @ViewChildren('breadcrumb', { read: ElementRef }) public breadcrumbsList: QueryList<ElementRef> =
    prizmEmptyQueryList();
  @ContentChildren(PrizmBreadcrumbDirective) public breadcrumbsItem: QueryList<PrizmBreadcrumbDirective> =
    prizmEmptyQueryList();

  public breadcrumbs$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbsToShow$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbsInMenu$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);

  public isDropdownOpened = false;
  public isContainerOverflowed = false;
  public breadcrumbsElementsWidth!: number;

  public get activeBreadcrumbIdx(): number {
    return this.breadcrumbsToShow$.getValue().length - 1;
  }

  private resizeObserver!: ResizeObserver;
  private mutationDetector$: Subject<void> = new Subject<void>();

  constructor(private readonly cdRef: ChangeDetectorRef, private readonly destroy: PrizmDestroyService) {
    super();
  }

  public changeBreadcrumb(idx: number): void {
    this.breadcrumbs = this.breadcrumbs.filter((item, i) => i <= idx);
    this.breadcrumbChange.emit(this.breadcrumbs[idx]);
  }

  public ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.mutationDetector$.next());
    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  public ngAfterViewInit(): void {
    const $mutation = this.mutationDetector$.pipe(
      debounceTime(200),
      observeOn(animationFrameScheduler),
      tap(() => {
        this.calculateOverflowState();
        this.setViewBreadcrumbs(this.breadcrumbs);
      })
    );

    const $breadcrumbsChange = this.breadcrumbs$.pipe(
      debounceTime(200),
      observeOn(animationFrameScheduler),
      tap(item => {
        this.calculateBreadcrumbsWidth();
        this.calculateOverflowState();
        this.setViewBreadcrumbs(item);
      })
    );

    merge($breadcrumbsChange, $mutation)
      .pipe(debounceTime(200), takeUntil(this.destroy))
      .subscribe(() => this.cdRef.detectChanges());
  }

  public ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.mutationDetector$.complete();
  }

  private calculateOverflowState(): void {
    const containerWidth = this.containerRef.nativeElement.clientWidth;
    const contentWidth = this.breadcrumbsElementsWidth;

    if (contentWidth > containerWidth) {
      this.isContainerOverflowed = this.breadcrumbs.length > 2;
    } else {
      this.isDropdownOpened = false;
      this.isContainerOverflowed = false;
    }
  }

  private calculateBreadcrumbsWidth(): void {
    this.breadcrumbsElementsWidth = this.fakeBreadcrumbContainer.nativeElement.clientWidth;
  }

  private setViewBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    if (this.isContainerOverflowed) {
      this.breadcrumbsInMenu$.next(breadcrumbs.filter((item, i) => i > 0 && i < breadcrumbs.length - 1));
      this.breadcrumbsToShow$.next(breadcrumbs.filter((item, i) => i === 0 || i === breadcrumbs.length - 1));
    } else {
      this.breadcrumbsInMenu$.next([]);
      this.breadcrumbsToShow$.next(breadcrumbs);
    }
  }
}
