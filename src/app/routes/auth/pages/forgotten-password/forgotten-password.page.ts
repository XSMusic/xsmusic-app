import { Component } from '@angular/core';
import { AuthService } from '@core/auth';
import { TOAST_STATE, UIService } from '@services';

@Component({
  selector: 'page-forgotten-password',
  templateUrl: 'forgotten-password.page.html',
})
export class ForgottenPasswordPage {
  email = '';
  constructor(private authService: AuthService, private ui: UIService) {}

  forgottenPassword() {
    if (this.email.length > 0) {
      this.authService.forgottenPassword(this.email).subscribe({
        next: (response) =>
          this.ui.toast.showToast(TOAST_STATE.info, response.message),
        error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
      });
    } else {
      this.ui.toast.showToast(TOAST_STATE.warning, 'Introduce el email');
    }
  }
}
