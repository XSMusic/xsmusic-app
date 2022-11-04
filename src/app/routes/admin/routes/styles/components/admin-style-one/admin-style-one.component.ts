import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Style } from '@models';
import { StyleService, ToastService } from '@services';
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
    private toast: ToastService
  ) {}

  onSubmit() {
    const validation = this.validationSubmit();
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

  validationSubmit() {
    if (this.style.name === '') {
      return {
        state: false,
        message: 'El nombre es obligatorio',
      };
    } else {
      return {
        state: true,
        message: '',
      };
    }
  }

  onDelete() {
    // TODO: Añadir confirmacion por modal
    this.styleService.deleteOne(this.style._id!).subscribe({
      next: (response) => this.onSuccess.emit(response),
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }
}
