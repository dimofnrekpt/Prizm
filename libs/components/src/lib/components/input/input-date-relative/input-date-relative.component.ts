import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { prizmDefaultProp } from '@prizm-ui/core';
import { prizmIsNativeFocusedIn } from '../../../util/is-native-focused-in';
import { PrizmInputSize } from '../common/models/prizm-input.models';
import {
  getDefaultRelativeDateMenuItems,
  IdByGroup,
  RelativeDateDirectionId,
  RelativeDateMenuItem,
  RelativeDateMenuItems,
  RelativeDatePeriodId,
  RelativeDateTimeId,
} from './input-date-relative.models';
import { ParseTextInput, RenderText, UpdateActiveItem } from './input-date-relative.utils';
import { prizmIsNativeFocused } from '../../../util';
import { PRIZM_DATE_RIGHT_BUTTONS } from '../../../tokens/date-extra-buttons';
import { PrizmDateButton } from '../../../types/date-button';
import { PrizmFormControlHelpers } from '@prizm-ui/helpers';
import { PrizmAbstractTestId } from '../../../abstract/interactive';

const MenuItems: RelativeDateMenuItems = getDefaultRelativeDateMenuItems();
const ValidationPattern = '(T|\\*)((\\+|\\-)(\\d+)(Y|M|d|h|m|s))?((\\+|\\-)(\\d+)(Y|M|d|h|m|s))?';

@Component({
  selector: 'prizm-input-date-relative',
  templateUrl: './input-date-relative.component.html',
  styleUrls: ['./input-date-relative.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrizmInputDateRelativeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrizmInputDateRelativeComponent
  extends PrizmAbstractTestId
  implements AfterViewInit, OnInit, ControlValueAccessor, OnDestroy
{
  @ViewChild('focusableElementRef', { read: ElementRef })
  public readonly focusableElement?: ElementRef<HTMLInputElement>;

  @Input()
  @prizmDefaultProp()
  public label = 'Относительное';

  @Input()
  @prizmDefaultProp()
  public placeholder = 'Выберите относительное время';

  @Input() forceClear: boolean | null = null;

  @Input()
  @prizmDefaultProp()
  /**
   * @deprecated
   * */
  public set disabled(value: boolean) {
    const ngControl = this.injector.get(NgControl);
    if (ngControl.control) {
      if (value) {
        ngControl.control.disable();
      } else {
        ngControl.control.enable();
      }
    } else {
      this.setDisabledState(value);
    }
  }
  public get disabled(): boolean {
    return this.value.disabled;
  }

  @Input()
  @prizmDefaultProp()
  public showClear!: boolean;

  @Input()
  @prizmDefaultProp()
  public canOpen = true;

  @Input()
  @prizmDefaultProp()
  public outer = false;

  @Input()
  @prizmDefaultProp()
  public size: PrizmInputSize = 'm';

  @Input()
  @prizmDefaultProp()
  extraButtonInjector: Injector = this.injector;

  override readonly testId_ = 'ui_input_date_relative';

  public isOpen = false;

  public value = new UntypedFormControl('', Validators.pattern(ValidationPattern));
  public timeItems: RelativeDateMenuItem<RelativeDateTimeId>[] = [...MenuItems.time];
  public directionItems: RelativeDateMenuItem<RelativeDateDirectionId>[] = [...MenuItems.direction];
  public periodItems: RelativeDateMenuItem<RelativeDatePeriodId>[] = [...MenuItems.period];

  private activeTimeId!: RelativeDateTimeId | null;
  private activeDirectionId!: RelativeDateDirectionId;
  private activePeriodId!: RelativeDatePeriodId;
  private activeNumber = '';

  public onChangeFn!: (_: unknown) => unknown;
  public onTouched!: VoidFunction;

  private readonly subscriptions = new Subscription();

  public rightButtons$!: BehaviorSubject<PrizmDateButton[]>;

  constructor(public readonly injector: Injector, private readonly cdr: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.rightButtons$ = this.extraButtonInjector.get(PRIZM_DATE_RIGHT_BUTTONS);
  }

  public ngAfterViewInit(): void {
    const control = this.injector.get(NgControl) as unknown as UntypedFormControl;
    this.value.addValidators(control.validator as unknown);

    this.subscriptions.add(
      this.value.valueChanges.subscribe(() => {
        this.parseInputValue();
        this.actualizeMenu();
        this.onChangeFn(this.value.value);
      })
    );

    this.subscriptions.add(
      PrizmFormControlHelpers.syncValues(
        control,
        v => v,
        v => v,
        this.value
      ).subscribe()
    );

    this.subscriptions.add(PrizmFormControlHelpers.syncStates(control, true, this.value).subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public writeValue(value: number): void {
    this.value.markAsDirty();
    this.value.setValue(value?.toString());
  }

  public registerOnChange(fn: (_: unknown) => void): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.value.disable();
    } else {
      this.value.enable();
    }

    this.cdr.markForCheck();
  }

  public clearValue(): void {
    this.value.setValue('');
  }

  public onMenuItemClick(event: MouseEvent, item: RelativeDateMenuItem): void {
    event.stopImmediatePropagation();
    switch (item.groupId) {
      case 'time':
        this.activeTimeId = <IdByGroup<'time'>>item.id;
        break;

      case 'direction':
        this.activeDirectionId = <IdByGroup<'direction'>>item.id;
        break;

      case 'period':
        this.activePeriodId = <IdByGroup<'period'>>item.id;
        break;
    }

    this.actualizeMenu();
    this.actualizeInput();
    this.onChangeFn(this.value.value);

    this.cdr.detectChanges();
  }

  /**
   * Parses control input value
   */
  private parseInputValue(): void {
    const textInput = this.value.value;

    const model = ParseTextInput(textInput);

    this.activeTimeId = model.time;
    this.activeDirectionId = model.direction;
    this.activeNumber = model.number;
    this.activePeriodId = model.period;
  }

  public get nativeFocusableElement(): HTMLInputElement | null {
    return this.focusableElement ? (this.focusableElement.nativeElement as HTMLInputElement) : null;
  }

  public get focused(): boolean {
    return prizmIsNativeFocusedIn(this.focusableElement?.nativeElement as unknown);
  }

  /**
   * Set control input as text
   */
  private actualizeInput(): void {
    const stringValue = RenderText({
      time: this.activeTimeId as unknown,
      number: this.activeNumber,
      direction: this.activeDirectionId,
      period: this.activePeriodId,
    });

    this.value.setValue(stringValue);
  }

  public onClear(): void {
    this.activeTimeId = null;
    this.actualizeMenu();
  }

  /**
   * Actualize menu items, as radio group button
   */
  private actualizeMenu(): void {
    this.timeItems = UpdateActiveItem(this.timeItems, this.activeTimeId) as unknown;
    this.directionItems = UpdateActiveItem(this.directionItems, this.activeDirectionId);
    this.periodItems = UpdateActiveItem(this.periodItems, this.activePeriodId);
  }

  public onOpenChange(state: boolean): void {
    this.isOpen = state;
  }

  public safeOpenModal(): void {
    const inputElement = this.focusableElement?.nativeElement;
    if (!this.isOpen && !this.disabled && inputElement && prizmIsNativeFocused(inputElement)) {
      this.isOpen = true;
      this.cdr.markForCheck();
    }
  }
}
