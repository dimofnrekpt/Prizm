import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ZyfraLocale } from '../model/zyfra-date-picker-locale.enum';
import { ZyfraDatePickerMode } from '../model/zyfra-date-picker-mode.enum';
import { ZyfraDatePickerValueType } from '../model/zyfra-date-picker-value-type.enum';
import { ZyfraDatepickerModeSelectComponent } from '../zyfra-datepicker-mode-select/zyfra-datepicker-mode-select.component';

@Component({
  selector: 'zyfra-datepicker-multi',
  templateUrl: './zyfra-datepicker-multi.component.html',
  styleUrls: ['./zyfra-datepicker-multi.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZyfraDatepickerMultiComponent {
  // Base from relative & absolute components
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public disabled: boolean;
  @Input() public showClear: boolean;

  // Current component 'multi'
  @Input() mode = ZyfraDatePickerMode.absolute;

  // wrapper for relative component
  @Input() public relativeValue: string;

  // wrapper for absolute component
  @Input() model: string | number | Date;
  @Input() required: boolean;
  @Input() spanClass: string;
  @Input() showDate: boolean = true;
  @Input() showTime: boolean;
  @Input() inputClass: string = '';
  @Input() monthNavigator: boolean = false;
  @Input() yearNavigator: boolean = false;
  @Input() yearRange: string = null;
  @Input() showCalendarBtn: boolean = true;
  @Input() calendarBtnLabel: string;
  @Input() hideOnDateTimeSelect: boolean = true;
  @Input() numberOfMonths: number = 1;
  @Input() selectionMode: string = 'single';
  @Input() disabledDates: Date[] = null;
  @Input() disabledDays: number[] = null;
  @Input() firstDayOfWeek: number = 1;
  @Input() showOnFocus: boolean = false;
  @Input() showWeek: boolean = false;
  @Input() locale: ZyfraLocale = ZyfraLocale.ru;
  @Input() dateFormat: string;
  @Input() timeFormat: string;
  @Input() returnFormatValue: ZyfraDatePickerValueType;

  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputId: string;
  @Input() name: string;
  @Input() inputStyleClass: string;
  @Input() ariaLabelledBy: string;
  @Input() iconAriaLabel: string;
  @Input() multipleSeparator: string = ',';
  @Input() rangeSeparator: string = '-';
  @Input() inline: boolean = false;
  @Input() showOtherMonths: boolean = true;
  @Input() selectOtherMonths: boolean;
  @Input() showIcon: boolean;
  @Input() icon: string = 'pi pi-calendar';
  @Input() appendTo: any;
  @Input() readonlyInput: boolean;
  @Input() shortYearCutoff: any = '+10';
  @Input() hourFormat: string = '24';
  @Input() timeOnly: boolean;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;
  @Input() stepSecond: number = 1;
  @Input() showSeconds: boolean = false;
  @Input() dataType: string = 'date';
  @Input() maxDateCount: number;
  @Input() showButtonBar: boolean;
  @Input() todayButtonStyleClass: string = 'p-button-text';
  @Input() clearButtonStyleClass: string = 'p-button-text';
  @Input() autoZIndex: boolean = true;
  @Input() baseZIndex: number = 0;
  @Input() panelStyleClass: string;
  @Input() panelStyle: any;
  @Input() keepInvalid: boolean = false;
  @Input() touchUI: boolean;
  @Input() timeSeparator: string = ':';
  @Input() focusTrap: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Input() tabindex: number;
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onInput: EventEmitter<any> = new EventEmitter();
  @Output() onTodayClick: EventEmitter<any> = new EventEmitter();
  @Output() onClearClick: EventEmitter<any> = new EventEmitter();
  @Output() onMonthChange: EventEmitter<any> = new EventEmitter();
  @Output() onYearChange: EventEmitter<any> = new EventEmitter();
  @Output() onClickOutside: EventEmitter<any> = new EventEmitter();
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() public valueChange = new EventEmitter<any>();
  @Output() public modeChange = new EventEmitter<ZyfraDatePickerMode>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // TODO need button with dropdown
  public onClickButtonSelect(event: MouseEvent, select: ZyfraDatepickerModeSelectComponent): void {
    if (!select.dropdown.dropdown.overlayVisible) {
      select.dropdown.dropdown.onMouseclick(event);
      event.stopPropagation();
    }
  }

  public onSelectChanged(mode: ZyfraDatePickerMode): void {
    this.modeChange.emit(mode);
    this.mode = mode;
    this.cdr.detectChanges();
  }
}
