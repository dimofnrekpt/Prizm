import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ZuiDestroyService } from '@digital-plant/zyfra-helpers';
import { fromEvent, merge } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { ZuiInputLayoutComponent } from '../common/input-layout/input-layout.component';
import { ZuiInputPasswordDirective } from './input-password.directive';

@Component({
  selector: 'zui-input-password-auxiliary-control',
  template: ` <button
    [zuiInputIconButton]="icon"
    class="btn"
    #btn
    [interactive]="true"
    (click)="toggle()"
  ></button>`,
  styles: [
    `
      :host {
        display: block;
      }

      :host-context(.zui-input-form-outer[data-size='m']) {
        font-size: 15px;
      }

      :host-context(.zui-input-form-outer[data-size='s']) {
        font-size: 11px;
      }

      .btn {
        display: block;
      }
    `,
  ],
  providers: [ZuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZuiInputPasswordDefaultControlComponent {
  @Input() inputPassword!: ZuiInputPasswordDirective;

  constructor(
    public readonly layout: ZuiInputLayoutComponent,
    private readonly destroy$: ZuiDestroyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get icon(): string {
    return this.inputPassword.passwordHidden ? 'sort-eye' : 'sort-eye-off-2';
  }

  public toggle(): void {
    this.inputPassword.toggle();
  }
}

