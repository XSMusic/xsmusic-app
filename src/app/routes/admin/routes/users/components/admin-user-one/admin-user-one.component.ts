import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Image, User } from '@models';
import {
  ApiService,
  TOAST_STATE,
  UIService,
  ValidationsFormService,
} from '@services';

@Component({
  selector: 'admin-user-one',
  templateUrl: 'admin-user-one.component.html',
  animations: [inOutAnimation],
})
export class AdminUserOneComponent {
  @Input() user = new User();
  darkModeValues = [
    { name: 'Sistema', value: 'system' },
    { name: 'Activado', value: 'on' },
    { name: 'Desactivado', value: 'off' },
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private ui: UIService,
    private validationsFormService: ValidationsFormService
  ) {}

  showImage(image: Image) {
    this.ui.fullImage.show(image);
  }

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'user',
      this.user
    );
    if (validation.state) {
      const observable = this.user._id
        ? this.apiService.update<User>('artists', this.user)
        : this.apiService.create<User>('artists', this.user);
      observable.subscribe({
        next: () =>
          this.onSuccess(
            this.user._id
              ? { message: 'Usuario Actualizado' }
              : { message: 'Usuario Creado' }
          ),
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.ui.toast.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onDelete() {
    const modal = this.ui.modal.showModalConfirm(
      'Eliminar usuario',
      '¿Estas seguro de eliminar el usuario?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.apiService.deleteOne('users', this.user._id!).subscribe({
              next: (response) => this.onSuccess(response),
              error: (error) =>
                this.ui.toast.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }

  onSuccess(response: MessageI) {
    this.ui.toast.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.usersAdmin]);
  }
}
