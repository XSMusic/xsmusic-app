import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ModalService } from '@shared/services/ui/modal/modal.service';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  animations: [
    trigger('backdropTrigger', [
      state('open', style({ opacity: 100 })),
      state('close', style({ opacity: 0 })),
      transition('open <=> close', [animate('300ms ease-out')]),
    ]),
  ],
})
export class ModalComponent {
  constructor(public modal: ModalService) {}

  dismiss(action?: string | boolean): void {
    if (action !== undefined) {
      this.modal.dismissModal(action);
    } else {
      this.modal.dismissModal();
    }
  }
}
