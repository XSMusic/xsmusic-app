import { Component, Input } from '@angular/core';
import { inOutAnimation } from '@core/animations/enter-leave.animations';
import { Artist } from '@models';

@Component({
  selector: 'artist-last-multi',
  templateUrl: './artist-last-multi.component.html',
  animations: [inOutAnimation],
})
export class ArtistLastMultiComponent {
  @Input() views: any[] = [];
  @Input() artist!: Artist;
  view = 'set';
}
