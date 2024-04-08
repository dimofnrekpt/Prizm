import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PrizmDestroyService, PrizmLetDirective } from '@prizm-ui/helpers';
import { PrizmSwitcherItem } from '../switcher';
import { UntypedFormControl } from '@angular/forms';
import { PrizmCronService, prizmI18nInitWithKey } from '../../services';
import { distinctUntilChanged, filter, first, map, skip, startWith, takeUntil, tap } from 'rxjs/operators';
import { PrizmCronUiSecondState } from './cron-ui-second.state';
import { PrizmCronUiMinuteState } from './cron-ui-minute.state';
import { PrizmCronUiHourState } from './cron-ui-hour.state';
import { PrizmCronUiMonthState } from './cron-ui-month.state';
import { PrizmCronUiYearState } from './cron-ui-year.state';
import { prizmIsTextOverflow } from '../../util';
import { PrizmCronPeriod, PrizmCronTabItem, PrizmCronTabSpecifiedList } from './model';
import { PrizmCronUiDayState } from './cron-ui-day.state';
import { prizmDefaultProp } from '@prizm-ui/core';
import { combineLatest, concat, Observable, timer } from 'rxjs';
import { PRIZM_LANGUAGE, PrizmLanguage, PrizmLanguageCron } from '@prizm-ui/i18n';
import { prizmCronHRToString } from '../cron-human-readable/human-readable/crons-i18n';
import { PRIZM_CRON } from '../../tokens';
import { PrizmAbstractTestId } from '../../abstract/interactive';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { PrizmCronMonthPipe } from './pipes/cron-month.pipe';
import { PrizmCronWeekPipe } from './pipes/cron-week.pipe';
import { PrizmCronInnerModule } from './cron-inner.module';
import { PrizmCronHumanReadablePipe } from '../cron-human-readable';

@Component({
  selector: 'prizm-cron',
  styleUrls: ['./cron.component.less'],
  templateUrl: './cron.component.html',
  exportAs: 'prizmCron',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PrizmDestroyService,
    PrizmCronService,
    PrizmLetDirective,
    PrizmCronUiSecondState,
    PrizmCronUiMonthState,
    PrizmCronUiHourState,
    PrizmCronUiDayState,
    PrizmCronUiYearState,
    PrizmCronUiMinuteState,
    ...prizmI18nInitWithKey(PRIZM_CRON, 'cron'),
  ],
  standalone: true,
  imports: [PrizmCronHumanReadablePipe, PrizmCronInnerModule, PrizmCronMonthPipe, PrizmCronWeekPipe],
})
export class PrizmCronComponent extends PrizmAbstractTestId implements OnInit {
  @Input() public title: string | null = null;
  @Input() public set value(value: string) {
    if (!value) return;
    this.cron.updateWith(value);
  }
  public get value(): string {
    return this.cron.valueAsString;
  }

  @Input()
  @prizmDefaultProp()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input()
  @prizmDefaultProp()
  autoSubmit = false;

  @Input()
  @prizmDefaultProp()
  hidePeriod = false;

  @Input()
  @prizmDefaultProp()
  hideResult = false;

  @Input()
  @prizmDefaultProp()
  showHumanReadable = false;

  @Input()
  @prizmDefaultProp()
  resetButton = false;

  override readonly testId_ = 'ui_cron';

  @Input()
  @prizmDefaultProp()
  public set period(period: PrizmCronPeriod) {
    if (this.indefinitelyControl.value !== period.indefinitely)
      this.indefinitelyControl.setValue(period.indefinitely);

    if (this.startDateControl.value !== period.start) this.startDateControl.setValue(period.start);

    if (this.endDateControl.value !== period.end) this.endDateControl.setValue(period.end);
  }
  public get period(): PrizmCronPeriod {
    return {
      indefinitely: this.indefinitelyControl.value,
      start: this.startDateControl.value,
      end: this.indefinitelyControl.value ? null : this.endDateControl.value,
    };
  }

  readonly cronLanguage$ = this.language$.pipe(
    map(lang => {
      return lang.shortName;
    })
  );

  readonly humanReadableStr$ = combineLatest([this.cronLanguage$, this.cron.valueAsString$]).pipe(
    map(([lang, val]) => {
      return prizmCronHRToString(val, {
        locale: lang,
      });
    })
  );

  @Output() valueChange = new EventEmitter<string>();
  @Output() periodChange = new EventEmitter<PrizmCronPeriod>();
  @Output() selectedChange = new EventEmitter<PrizmCronTabItem>();

  @Input()
  set selected(selected: PrizmCronTabItem) {
    this.selectedSwitcherIdx = this.switchers.findIndex(i => i.id === selected);
  }

  @Input() specifiedList: PrizmCronTabSpecifiedList | null = null;
  @Input() set tabs(tabs: PrizmCronTabItem[]) {
    this.switchers = this.switchers.map(i => {
      i.hide = !tabs.includes(i.id as any);
      return i;
    });

    if (tabs.length && !tabs.includes(this.selected)) {
      this.selectedChange.emit((this.selected = tabs[0]));
    }
  }

  public switchers: PrizmSwitcherItem<PrizmCronTabItem>[] = [
    {
      title: 'Секунды',
      id: 'second',
    },
    {
      title: 'Минуты',
      id: 'minute',
    },
    {
      title: 'Часы',
      id: 'hour',
    },
    {
      title: 'Дни',
      id: 'day',
    },
    {
      title: 'Месяцы',
      id: 'month',
    },
    {
      title: 'Годы',
      id: 'year',
    },
  ];

  initialValue!: string;
  public readonly value$ = this.cron.value$;
  public readonly valueAsString$ = this.cron.valueAsString$;
  public readonly startDateControl = new UntypedFormControl();
  public readonly endDateControl = new UntypedFormControl();
  public readonly indefinitelyControl = new UntypedFormControl(false);
  public indefinitely = false;
  public selectedSwitcherIdx = 0;
  public readonly prizmIsTextOverflow = prizmIsTextOverflow;

  constructor(
    @Inject(PRIZM_LANGUAGE)
    readonly language$: Observable<PrizmLanguage>,
    public readonly cron: PrizmCronService,
    @Inject(PRIZM_CRON) public readonly cronI18n$: Observable<PrizmLanguageCron['cron']>,
    private readonly destroy$: PrizmDestroyService,
    private readonly cronUiSecondState: PrizmCronUiSecondState,
    private readonly cronUiHourState: PrizmCronUiHourState,
    private readonly cronUiYearState: PrizmCronUiYearState,
    private readonly cronUiMonthState: PrizmCronUiMonthState,
    private readonly cronUiMinuteState: PrizmCronUiMinuteState,
    private readonly cronUiDayState: PrizmCronUiDayState
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initAutoSubmiter();
    this.cronUiSecondState.init();
    this.cronUiHourState.init();
    this.cronUiDayState.init();
    this.cronUiMonthState.init();
    this.cronUiYearState.init();
    this.cronUiMinuteState.init();
    this.initEndDateStateChanger();
    this.saveInitialValue();
  }

  private endDateStateCorrector(): void {
    if (this.indefinitelyControl.value) this.endDateControl.disable();
    else this.endDateControl.enable();
  }

  private initEndDateStateChanger(): void {
    concat(timer(0).pipe(map(() => this.indefinitelyControl.value)), this.indefinitelyControl.valueChanges)
      .pipe(
        tap(() => this.endDateStateCorrector()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private emitPeriod(): void {
    if (this.hidePeriod) return;
    this.periodChange.emit(this.period);
  }

  private saveInitialValue(): void {
    this.initialValue = this.cron.valueAsString;
  }

  private initAutoSubmiter(): void {
    this.cron.valueAsString$
      .pipe(
        filter(() => this.autoSubmit && !this.disabled),
        distinctUntilChanged(),
        tap(val => {
          this.valueChange.emit(val);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    combineLatest([
      this.startDateControl.valueChanges.pipe(startWith(this.startDateControl.value), distinctUntilChanged()),
      this.endDateControl.valueChanges.pipe(startWith(this.endDateControl.value), distinctUntilChanged()),
      this.indefinitelyControl.valueChanges.pipe(
        startWith(this.indefinitelyControl.value),
        distinctUntilChanged()
      ),
    ])
      .pipe(
        skip(1),
        filter(() => this.autoSubmit && !this.disabled),
        tap(controls => {
          this.emitPeriod();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private emit(cronValue: string): void {
    if (this.disabled) return;
    this.valueChange.emit(cronValue);
    this.emitPeriod();
    this.saveInitialValue();
  }

  public submit(): void {
    this.cron.valueAsString$
      .pipe(
        tap(val => {
          this.emit(val);
        }),
        first(),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public reset(): void {
    this.value = this.initialValue;
  }

  public copy(): void {
    // TODO safe with injection
    navigator.clipboard.writeText(this.cron.valueAsString);
  }

  public copyHumanReadable(): void {
    this.humanReadableStr$
      .pipe(
        first(),
        tap(humanReadableStr => {
          navigator.clipboard.writeText(humanReadableStr);
        })
      )
      .subscribe();
  }

  public indexChanged(index: number): void {
    const selected = this.switchers.find((_, i) => i === index);
    this.selectedChange.emit((this.selected = selected?.id as any));
  }
}
