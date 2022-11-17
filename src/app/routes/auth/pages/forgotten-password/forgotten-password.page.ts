import { Component } from '@angular/core';
import { AuthService } from '@core/auth';
import { ToastService, TOAST_STATE } from '@services';

@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.page.html',
})
export class ForgottenPasswordPage {
  email = '';
  constructor(private authService: AuthService, private toast: ToastService) {}

  forgottenPassword() {
    if (this.email.length > 0) {
      this.authService.forgottenPassword(this.email).subscribe({
        next: (response) =>
          this.toast.showToast(TOAST_STATE.info, response.message),
        error: (error) => this.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.toast.showToast(TOAST_STATE.warning, 'Introduce el email');
    }
  }
}
