import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Style } from '@models';
import {
  ApiService,
  TOAST_STATE,
  UIService,
  ValidationsFormService,
} from '@services';
import { MessageI } from '@interfaces';

@Component({
  selector: 'admin-style-one',
  templateUrl: './admin-style-one.component.html',
})
export class AdminStyleOneComponent {
  @Input() style!: Style;
  @Output() onSuccess = new EventEmitter<MessageI>();
  constructor(
    private apiService: ApiService,
    private ui: UIService,
    private validationsFormService: ValidationsFormService
  ) {}

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'style',
      this.style
    );
    if (validation.state) {
      const observable = this.style._id
        ? this.apiService.update<Style>('styles', this.style)
        : this.apiService.create<Style>('styles', this.style);
      observable.subscribe({
        next: () =>
          this.onSuccess.emit({
            message: this.style._id ? 'Estilo actualizado' : 'Estilo creado',
          }),
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onDelete() {
    const modal = this.ui.modal.showModalConfirm(
      'Eliminar estilo',
      '¿Estas seguro de eliminar el estilo?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.apiService.deleteOne('styles', this.style._id!).subscribe({
              next: (response) => this.onSuccess.emit(response),
              error: (error) =>
                this.ui.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }
}
