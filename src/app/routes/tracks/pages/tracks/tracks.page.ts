import { Component } from '@angular/core';
import { GenericListBase } from '@components';

@Component({
  selector: 'tracks',
  template: `<generic-list-base
    type="media"
    subType="track"
  ></generic-list-base>`,
})
export class TracksPage extends GenericListBase {}
