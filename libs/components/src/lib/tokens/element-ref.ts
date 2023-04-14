import { ElementRef, InjectionToken } from '@angular/core';

export const PRIZM_ELEMENT_REF = new InjectionToken<ElementRef>(
  'ElementRef when you cannot use @Input for single time injection'
);
