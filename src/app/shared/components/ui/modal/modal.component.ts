import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { ModalService } from '@services';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  animations: [
    trigger('backdropTrigger', [
      state('open', style({ opacity: 100 })),
      state('close', style({ opacity: 0 })),
      transition('open <=> close', [animate('300ms ease-out')]),
    ]),
    trigger('modalTrigger', [
      state('open', style({ display: 'block', opacity: 100 })),
      state('close', style({ display: 'none', opacity: 0 })),
      transition('open <=> close', [animate('300ms ease-out')]),
    ]),
  ],
})
export class ModalComponent {
  constructor(public modal: ModalService) {}

  dismiss(): void {
    this.modal.dismissModal();
  }
}
