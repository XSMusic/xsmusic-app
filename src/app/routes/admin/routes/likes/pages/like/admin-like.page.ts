import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-like',
  template: `<generic-admin-one-base type="like"></generic-admin-one-base>`,
})
export class AdminLikePage extends GenericAdminOneBase {}
