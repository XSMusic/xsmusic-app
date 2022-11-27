import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Style } from '@models';
import {
  ModalService,
  StyleService,
  ToastService,
  ValidationsFormService,
} from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { MessageI } from '@interfaces';

@Component({
  selector: 'admin-style-one',
  templateUrl: './admin-style-one.component.html',
})
export class AdminStyleOneComponent {
  @Input() style!: Style;
  @Output() onSuccess = new EventEmitter<MessageI>();
  constructor(
    private styleService: StyleService,
    private toast: ToastService,
    private modal: ModalService,
    private validationsFormService: ValidationsFormService
  ) {}

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'style',
      this.style,
    );
    if (validation.state) {
      const observable = this.style._id
        ? this.styleService.update(this.style)
        : this.styleService.create(this.style);
      observable.subscribe({
        next: (response) => this.onSuccess.emit(response),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onDelete() {
    const modal = this.modal.showModalConfirm(
      'Eliminar estilo',
      '¿Estas seguro de eliminar el estilo?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.styleService.deleteOne(this.style._id!).subscribe({
              next: (response) => this.onSuccess.emit(response),
              error: (error) => this.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }
}
