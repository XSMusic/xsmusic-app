import { Component } from '@angular/core';
import { GenericAdminOneBase } from '@components';

@Component({
  selector: 'page-admin-artist',
  template: `<generic-admin-one-base type="artist"></generic-admin-one-base>`,
})
export class AdminArtistPage extends GenericAdminOneBase {}
