import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'festivals',
  template: `<generic-list-base
    type="site"
    subType="festival"
  ></generic-list-base>`,
})
export class FestivalsPage extends GenericListBase {}
