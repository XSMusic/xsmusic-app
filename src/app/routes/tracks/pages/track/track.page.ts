import { Component } from '@angular/core';
import { MediaOneBase } from '@components';

@Component({
  selector: 'page-set',
  template: `<media-one-base type="track"></media-one-base>`,
})
export class TrackPage extends MediaOneBase {}
