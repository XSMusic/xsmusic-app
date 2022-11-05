import { Component, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';

@Component({
  selector: 'artist-last-media',
  templateUrl: './artist-last-media.component.html',
  animations: [inOutAnimation]
})
export class ArtistLastMediaComponent {
  @Input() views: any[] = [];
  @Input() artist!: Artist;
  view = 'set';
}
