import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
// import { MenuBootstrapService } from './menu-bootstrap.service';
// import { Menu } from '@models';
import { AuthService } from '@core/auth';
import { Menu, User } from '@models';
import { MenuBootstrapService } from './menu-bootstrap.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private permissonsService: NgxPermissionsService,
    private menuService: MenuBootstrapService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve) => {
      this.authService
        .change()
        .pipe(
          tap((user: any) => this.setPermissions(user)),
          // switchMap(() => this.authService.menu()),
          // tap((menu) => this.setMenu(menu)),
        )
        .subscribe({
          next: () => resolve(),
          error: () => resolve(),
        });
    });
  }

  private setPermissions(user: User) {
    if (user.role) {
      const permissions = [user.role];
      this.permissonsService.loadPermissions(permissions);
    }
  }

  private setMenu(menu: Menu[]) {
      this.menuService.set(menu);
  }
}
