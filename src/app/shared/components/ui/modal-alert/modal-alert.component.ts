import { Component, EventEmitter, Input, Output } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { ModalAlert } from './modal-alert.model';

@Component({
  selector: 'modal-alert',
  templateUrl: 'modal-alert.component.html',
  animations: [inOutAnimation],
})
export class ModalAlertComponent {
  @Input() options = new ModalAlert();
  @Output() clickButton = new EventEmitter<void>();

  closeModal() {
    this.options.show = false;
    this.clickButton.emit();
  }
}
