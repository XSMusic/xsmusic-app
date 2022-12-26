import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';
import { User } from '@models';
import { ApiService, TOAST_STATE, UIService, UserService } from '@services';
import { darkMode } from '@shared/utils';

@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.page.html',
})
export class AccountEditPage implements OnInit {
  user!: User;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private userService: UserService,
    private ui: UIService
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
    this.apiService.update('users', this.user).subscribe({
      next: () => {
        this.ui.toast.showToast(
          TOAST_STATE.success,
          'Los datos han sido actualizados'
        );
        this.userService.set(this.user);
        darkMode(this.user);
      },
      error: (error) => this.ui.toast.showToast(TOAST_STATE.error, error),
    });
  }
}
