import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { LoginEmailDto } from '@core/auth/login.dto';
import { routesConfig } from '@core/config';
import { ToastService, UserService } from '@services';
import {
  DynamicFormBase,
  DynamicFormService,
} from '@shared/modules/dynamic-form';
import { TOAST_STATE } from '@shared/services/ui/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
})
export class LoginPage implements OnInit {
  email!: string;
  password!: string;
  formItems$!: Observable<DynamicFormBase<any>[]>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private userService: UserService,
    private dinamicForm: DynamicFormService
  ) {}

  ngOnInit(): void {
    this.formItems$ = this.dinamicForm.getQuestions();
  }

  loginEmail(e: string) {
    const body = JSON.parse(e) as LoginEmailDto;
    this.authService.loginEmail(body).subscribe({
      next: () => {
        this.router.navigate([routesConfig.home]);
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
