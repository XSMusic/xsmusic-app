import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';
import { User } from '@models';
import { ToastService, TOAST_STATE, UserService } from '@services';
import { darkMode } from '@shared/utils';

@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.page.html',
})
export class AccountEditPage implements OnInit {
  user!: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.user().subscribe((response) => {
      this.user = response;
    });
  }

  onSubmit() {
    this.userService.update(this.user).subscribe({
      next: (response) => {
        this.toast.showToast(TOAST_STATE.success, response.message);
        this.userService.set(this.user);
        darkMode(this.user);
      },
      error: (error) => this.toast.showToast(TOAST_STATE.error, error),
    });
  }
}
