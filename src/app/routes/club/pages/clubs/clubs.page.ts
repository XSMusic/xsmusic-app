import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'clubs',
  template: `<generic-list-base
    type="site"
    subType="club"
  ></generic-list-base>`,
})
export class ClubsPage extends GenericListBase {}
