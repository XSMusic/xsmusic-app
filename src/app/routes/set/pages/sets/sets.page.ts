import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'sets',
  template: `<generic-list-base
    type="media"
    subType="set"
  ></generic-list-base>`,
})
export class SetsPage extends GenericListBase {}
