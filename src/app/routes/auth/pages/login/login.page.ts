import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { ToastService, UserService } from '@services';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
})
export class LoginPage {
  email!: string;
  password!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private userService: UserService
  ) {}

  loginEmail() {
    this.authService
      .loginEmail({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          const user = this.userService.getUser();
          this.router.navigate([routesConfig.home]);
          this.toast.showToast(
            TOAST_STATE.success,
            `¡Bienvenid@ ${user.name}!`
          );
        },
        error: (error) => {
          this.toast.showToast(TOAST_STATE.error, error);
        },
      });
  }

  async loginGoogle() {
    (await this.authService.loginGoogle()).subscribe({
      next: () => {
        const user = this.userService.getUser();
        this.router.navigate([routesConfig.home]);
        this.toast.showToast(TOAST_STATE.success, `¡Bienvenid@ ${user.name}!`);
      },
      error: (error) => {
        this.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToForgottenPassword() {
    this.router.navigate([routesConfig.authForgottenPassword]);
  }

  wip() {
    this.toast.showToast(TOAST_STATE.warning, 'En construccion...');
  }
}
