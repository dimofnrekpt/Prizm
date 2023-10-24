import { Injectable } from '@angular/core';
import { PrizmInputControl } from '../base';

/**
 * Default class for input validation texts
 */
@Injectable()
export class PrizmInputValidationTexts {
  private readonly invalidTextMap = new Map<string, string>([
    ['required', 'Обязательное поле'],
    ['pattern', 'Неправильный формат'],
    ['min', 'Значение слишком маленькое'],
    ['max', 'Значение слишком большое'],
  ]);

  public getText(key: string, control?: PrizmInputControl<unknown>): string | undefined {
    return this.invalidTextMap.get(key);
  }
}
