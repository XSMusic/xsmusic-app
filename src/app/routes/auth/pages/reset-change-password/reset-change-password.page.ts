import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { ToastService, TOAST_STATE } from '@services';

@Component({
  selector: 'page-reset-change-password',
  templateUrl: 'reset-change-password.page.html',
})
export class ResetChangePasswordPage {
  password = '';
  repeatPassword = '';
  userId = '';
  token = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  onSubmit() {
    if (this.password.length >= 6) {
      if (this.password === this.repeatPassword) {
        this.authService
          .resetPassword(this.userId, this.token, this.password)
          .subscribe({
            next: (response) => {
              this.toast.showToast(TOAST_STATE.info, response.message);
              this.router.navigate([routesConfig.authLogin]);
            },
            error: (error) => this.toast.showToast(TOAST_STATE.error, error),
          });
      } else {
        this.toast.showToast(TOAST_STATE.warning, 'Introduce el email');
      }
    } else {
      this.toast.showToast(TOAST_STATE.warning, 'Minimo 6 caracteres');
    }
  }
}
