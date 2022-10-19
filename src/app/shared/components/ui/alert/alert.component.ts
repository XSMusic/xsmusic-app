import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
})
export class AlertComponent {
  @Input() type!: string;
  @Input() message!: string;
  @Input() actionText?: string;
  @Output() action = new EventEmitter<any>();
}
