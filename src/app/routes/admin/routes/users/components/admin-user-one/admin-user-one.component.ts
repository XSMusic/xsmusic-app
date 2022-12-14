import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { routesConfig } from '@core/config';
import { MessageI } from '@interfaces';
import { Image, User } from '@models';
import {
  ModalService,
  ToastService,
  UserService,
  ValidationsFormService,
} from '@services';
import { FullImageService } from '@shared/services/ui/full-image/full-image.service';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

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
    private userService: UserService,
    private fullImage: FullImageService,
    private toastService: ToastService,
    private router: Router,
    private modal: ModalService,
    private validationsFormService: ValidationsFormService
  ) {}

  showImage(image: Image) {
    this.fullImage.show(image);
  }

  onSubmit() {
    const validation = this.validationsFormService.validation(
      'user',
      this.user
    );
    if (validation.state) {
      const observable = this.user._id
        ? this.userService.update(this.user)
        : this.userService.create(this.user);
      observable.subscribe({
        next: (response) => this.onSuccess(response),
        error: (error) => this.toastService.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toastService.showToast(TOAST_STATE.error, validation.message);
    }
  }

  onDelete() {
    const modal = this.modal.showModalConfirm(
      'Eliminar usuario',
      '¿Estas seguro de eliminar el usuario?'
    );
    const sub$ = modal.subscribe({
      next: (response) => {
        if (response !== '') {
          if (response === true) {
            this.userService.deleteOne(this.user._id!).subscribe({
              next: (response) => this.onSuccess(response),
              error: (error) =>
                this.toastService.showToast(TOAST_STATE.error, error),
            });
          }
          sub$.unsubscribe();
        }
      },
    });
  }

  onSuccess(response: MessageI) {
    this.toastService.showToast(TOAST_STATE.success, response.message);
    this.router.navigate([routesConfig.usersAdmin]);
  }
}
