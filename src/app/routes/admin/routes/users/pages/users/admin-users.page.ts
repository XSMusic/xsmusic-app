import { Component } from '@angular/core';
import { GenericAdminListBase } from '@components';

@Component({
  selector: 'page-admin-users',
  template: `<generic-admin-list-base type="user"></generic-admin-list-base>`,
})
export class AdminUsersPage extends GenericAdminListBase {}
