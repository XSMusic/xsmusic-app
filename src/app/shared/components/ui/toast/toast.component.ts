import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastService } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ToastComponent {
  constructor(public toast: ToastService) {}

  dismiss(): void {
    this.toast.dismissToast();
  }
}
