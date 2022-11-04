import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
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

  load() {
    return new Promise<void>((resolve) => {
      this.authService
        .change()
        .pipe(tap((user: any) => this.setPermissions(user)))
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

  darkMode() {
    const themeLS = localStorage.getItem('theme');
    if (
      themeLS === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
