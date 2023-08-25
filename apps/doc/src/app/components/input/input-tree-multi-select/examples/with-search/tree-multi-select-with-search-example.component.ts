import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'prizm-multi-select-with-search-example',
  templateUrl: './tree-multi-select-with-search-example.component.html',
})
export class PrizmInputTreeMultiSelectWithSearchExampleComponent {
  value = true;
  readonly valueControl = new UntypedFormControl(['Андрей Сафанов']);
  readonly items = [
    'Андрей Сафанов',
    'Сергей Марков',
    'Аня Петрова',
    'Катя Петрова',
    'Саша Дуров',
    'Влад Константинов',
    'Костя Щербаков',
    'Рустам Гусев',
    'Филип Уваров',
  ];
}
