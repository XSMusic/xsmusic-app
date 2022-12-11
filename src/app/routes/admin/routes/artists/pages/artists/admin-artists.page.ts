import { Component } from '@angular/core';
import { GenericAdminListBase } from '@components';

@Component({
  selector: 'page-admin-artists',
  template: `<generic-admin-list-base type="artist"></generic-admin-list-base>`,
})
export class AdminArtistsPage extends GenericAdminListBase {}
