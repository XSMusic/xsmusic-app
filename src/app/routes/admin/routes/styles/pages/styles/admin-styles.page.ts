import { Component } from '@angular/core';
import { GenericAdminListBase } from '@components';

@Component({
  selector: 'page-admin-styles',
  template: `<generic-admin-list-base type="style"></generic-admin-list-base>`,
})
export class AdminStylesPage extends GenericAdminListBase {}
