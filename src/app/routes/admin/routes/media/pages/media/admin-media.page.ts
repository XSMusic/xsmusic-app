import { Component, OnInit } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-media',
  template: `<generic-admin-one-base type="media"></generic-admin-one-base>`,
})
export class AdminMediaPage extends GenericAdminOneBase implements OnInit {}
