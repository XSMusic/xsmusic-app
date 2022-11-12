import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { AuthService } from '@core/auth';
import { ToastService, TOAST_STATE } from '@services';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  animations: [inOutAnimation],
})
export class HomePage {
  constructor(private authService: AuthService, private toast: ToastService) {}

  loginUser() {
    this.authService.login('manolo@gmail.com', 'manolo').subscribe(() => {
      this.toast.showToast(TOAST_STATE.success, 'Bienvenido Usuario');
    });
  }

  loginAdmin() {
    this.authService.login('xskunk@gmail.com', 'xskunk').subscribe(() => {
      this.toast.showToast(TOAST_STATE.success, 'Bienvenido Admin');
    });
  }
}
