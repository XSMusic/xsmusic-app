import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-items',
  templateUrl: './options-items.component.html',
})
export class OptionsItemsComponent {
  @Input() options: { name: string; action: string }[] = [];
}
