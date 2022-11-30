import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '@core/auth';
import { User } from '@models';
import { NgxSpinnerService } from 'ngx-spinner';
import { darkMode } from '@shared/utils';

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
            darkMode(user);
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


}
