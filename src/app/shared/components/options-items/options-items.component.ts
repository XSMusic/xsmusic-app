import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionsItemI } from './options-items.interface';

@Component({
  selector: 'options-items',
  templateUrl: './options-items.component.html',
})
export class OptionsItemsComponent {
  @Input() options: OptionsItemI[] = [];
  @Output() onClickOption = new EventEmitter<OptionsItemI>();
}
