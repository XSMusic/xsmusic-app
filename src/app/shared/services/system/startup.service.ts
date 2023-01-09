import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '@core/auth';
import { User } from '@models';
import { darkMode } from '@shared/utils';
import { UIService } from '../ui';
import { GA } from '../ui/google-analytics/ga.model';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private permissonsService: NgxPermissionsService,
    private ui: UIService
  ) {}

  load() {
    return new Promise<void>((resolve) => {
      this.ui.spinner.show();
      this.authService
        .change()
        .pipe(
          tap((user: any) => {
            this.sendAutologinEvent();
            this.setPermissions(user);
            darkMode(user);
          })
        )
        .subscribe({
          next: () => {
            this.ui.spinner.hide();
            resolve();
          },
          error: () => {
            this.ui.spinner.hide();
            resolve();
          },
        });
    });
  }

  private sendAutologinEvent() {
    const gaEvent = new GA({
      event: 'autoLogin',
    });
    this.ui.ga2.event(gaEvent);
  }

  private setPermissions(user: User) {
    if (user.role) {
      const permissions = [user.role];
      this.permissonsService.loadPermissions(permissions);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
}
