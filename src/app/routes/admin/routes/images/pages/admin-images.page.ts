import { Component } from '@angular/core';
import { GenericAdminListBase } from '@components';

@Component({
  selector: 'page-admin-artists',
  template: `<generic-admin-list-base type="image"></generic-admin-list-base>`,
})
export class AdminImagesPage extends GenericAdminListBase {}
