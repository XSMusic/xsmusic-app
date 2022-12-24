import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { TOAST_STATE, UIService, UserService } from '@services';

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
    private ui: UIService,
    private userService: UserService
  ) {}

  loginEmail() {
    this.authService
      .loginEmail({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          const user = this.userService.getUser();
          this.router.navigate([routesConfig.home]);
          this.ui.toast.showToast(
            TOAST_STATE.success,
            `¡Bienvenid@ ${user.name}!`
          );
        },
        error: (error) => {
          this.ui.toast.showToast(TOAST_STATE.error, error);
        },
      });
  }

  async loginGoogle() {
    (await this.authService.loginGoogle()).subscribe({
      next: () => {
        const user = this.userService.getUser();
        this.router.navigate([routesConfig.home]);
        this.ui.toast.showToast(
          TOAST_STATE.success,
          `¡Bienvenid@ ${user.name}!`
        );
      },
      error: (error) => {
        this.ui.toast.showToast(TOAST_STATE.error, error);
      },
    });
  }

  goToForgottenPassword() {
    this.router.navigate([routesConfig.authForgottenPassword]);
  }

  wip() {
    this.ui.toast.showToast(TOAST_STATE.warning, 'En construccion...');
  }
}
