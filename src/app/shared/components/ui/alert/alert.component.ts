import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  animations: [inOutAnimation],
})
export class AlertComponent {
  @Input() type!: string;
  @Input() message!: string;
  @Input() actionText?: string;
  @Output() action = new EventEmitter<any>();
}
