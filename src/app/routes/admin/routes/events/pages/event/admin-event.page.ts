import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-event',
  template: `<generic-admin-one-base type="event"></generic-admin-one-base>`,
})
export class AdminEventPage extends GenericAdminOneBase {}
