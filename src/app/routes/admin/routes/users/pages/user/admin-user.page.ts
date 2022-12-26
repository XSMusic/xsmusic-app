import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-user',
  template: `<generic-admin-one-base type="user"></generic-admin-one-base>`,
})
export class AdminUserPage extends GenericAdminOneBase {}
