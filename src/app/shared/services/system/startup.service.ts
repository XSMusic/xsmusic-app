import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '@core/auth';
import { User } from '@models';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private permissonsService: NgxPermissionsService,
    private spinnerService: NgxSpinnerService
  ) {}

  load() {
    return new Promise<void>((resolve) => {
      this.spinnerService.show();
      this.authService
        .change()
        .pipe(
          tap((user: any) => {
            this.setPermissions(user);
            this.darkMode();
          })
        )
        .subscribe({
          next: () => {
            this.spinnerService.hide();
            resolve();
          },
          error: () => {
            this.spinnerService.hide();
            resolve();
          },
        });
    });
  }

  private setPermissions(user: User) {
    if (user.role) {
      const permissions = [user.role];
      this.permissonsService.loadPermissions(permissions);
    }
  }

  darkMode() {
    const themeLS = localStorage.getItem('theme');
    if (
      themeLS === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.remove('dark');
      // document.documentElement.classList.add('dark');
    } else {
      // document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('dark');
    }
  }
}
