import { Component } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { GenericOneBase } from '@components';

@Component({
  selector: 'page-artist',
  template: `<generic-one-base type="artist"></generic-one-base>`,
  animations: [inOutAnimation],
})
export class ArtistPage extends GenericOneBase {}
