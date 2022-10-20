import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { routesConfig } from '@core/config';
import { ToastService } from '@services';
import { ToastModel } from '@shared/components/ui/toast/toast.model';
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
    private toast: ToastService
  ) {}

  loginEmail() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate([routesConfig.home]);
        this.toast.showToast(TOAST_STATE.success, '¡Bienvenido!');
        this.dismissToast();
      },
      error: (error) => {
        this.toast.showToast(TOAST_STATE.danger, error);
        this.dismissToast();
      },
    });
  }

  private dismissToast(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 3000);
  }
}
