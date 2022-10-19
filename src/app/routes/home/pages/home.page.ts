import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { AuthService, LoginService } from '@core/auth';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  animations: [inOutAnimation],
})
export class HomePage {
  permissions$;
  roles$;
  constructor(
    private rolesService: NgxRolesService,
    private permissionsService: NgxPermissionsService,
    private authService: AuthService
  ) {
    this.permissions$ = permissionsService.permissions$;
    this.roles$ = rolesService.roles$;
  }

  login() {
    this.authService.login('', '').subscribe((response) => {
      console.log(response);
    })
  }

  allowTab() {
    this.permissionsService.addPermission('GG');
    this.rolesService.addRole('Nice', ['GG']);
  }

  prohibitTab() {
    // this.permissionsService.removePermission('Nice')
    this.rolesService.removeRole('Nice');
  }
}
