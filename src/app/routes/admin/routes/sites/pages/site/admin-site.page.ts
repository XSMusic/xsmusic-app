import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-site',
  template: `<generic-admin-one-base type="site"></generic-admin-one-base>`,
})
export class AdminSitePage extends GenericAdminOneBase {}
