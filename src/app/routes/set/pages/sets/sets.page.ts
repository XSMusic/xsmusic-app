import { Component } from '@angular/core';
import { MediaListBase } from '@shared/components/base/media-list.base';

@Component({
  selector: 'page-sets',
  template: `<media-list-base type="sets"></media-list-base>`,
})
export class SetsPage extends MediaListBase {}
