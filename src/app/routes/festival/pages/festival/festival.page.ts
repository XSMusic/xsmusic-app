import { Component } from '@angular/core';
import { GenericOneBase } from '@components';

@Component({
  selector: 'page-festival',
  template: `<generic-one-base
    type="site"
    subType="festival"
  ></generic-one-base>`,
})
export class FestivalPage extends GenericOneBase {}
