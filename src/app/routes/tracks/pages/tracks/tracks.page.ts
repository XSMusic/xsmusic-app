import { Component } from '@angular/core';
import { MediaListBase } from '@shared/components/base/media-list/media-list.base';

@Component({
  selector: 'page-tracks',
  template: `<media-list-base type="tracks"></media-list-base>`,
})
export class TracksPage extends MediaListBase {}
