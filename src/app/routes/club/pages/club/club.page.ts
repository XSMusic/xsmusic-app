import { Component } from '@angular/core';
import { GenericOneBase } from '@components';

@Component({
  selector: 'page-club',
  template: `<generic-one-base type="site" subType="club"></generic-one-base>`,
})
export class ClubPage extends GenericOneBase {}
